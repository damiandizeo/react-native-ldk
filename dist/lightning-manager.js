var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ldk from './ldk';
import { err, ok } from './utils/result';
import { DefaultLdkDataShape, DefaultTransactionDataShape, EEventTypes, ELdkData, ELdkLogLevels, ENetworks, } from './utils/types';
import { getAllStorageKeys, getLdkStorageKey, parseData, setAndGetMethodCheck, startParamCheck, } from './utils/helpers';
class LightningManager {
    constructor() {
        this.currentBlock = {
            hex: '',
            hash: '',
            height: 0,
        };
        this.watchTxs = [];
        this.watchOutputs = [];
        this.getBestBlock = () => __awaiter(this, void 0, void 0, function* () {
            return ({
                hex: '',
                hash: '',
                height: 0,
            });
        });
        this.account = {
            name: '',
            seed: '',
        };
        this.getItem = () => null;
        this.setItem = () => null;
        this.updateStorage = () => null;
        this.getTransactionData = () => __awaiter(this, void 0, void 0, function* () { return DefaultTransactionDataShape; });
        this.network = ENetworks.regtest;
        this.addPeer = ({ pubKey, address, port, timeout, }) => __awaiter(this, void 0, void 0, function* () {
            const peer = { pubKey, address, port };
            const addPeerResponse = yield ldk.addPeer(Object.assign(Object.assign({}, peer), { timeout }));
            if (addPeerResponse.isErr()) {
                return err(addPeerResponse.error.message);
            }
            this.saveLdkPeerData(peer).then().catch(console.error);
            return ok(addPeerResponse.value);
        });
        this.removePeer = ({ pubKey, address, port, }) => __awaiter(this, void 0, void 0, function* () {
            const peers = yield this.getPeers();
            const newPeers = peers.filter((p) => p.pubKey !== pubKey && p.address !== address && p.port !== port);
            const storageKey = getLdkStorageKey(this.account.name, ELdkData.peers);
            this.updateStorage(storageKey, JSON.stringify(newPeers));
            return ok(newPeers);
        });
        this.getPeers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const storageKey = getLdkStorageKey(this.account.name, ELdkData.peers);
                const peers = yield this.getItem(storageKey);
                return parseData(peers, DefaultLdkDataShape[ELdkData.peers]);
            }
            catch (_a) {
                return DefaultLdkDataShape[ELdkData.peers];
            }
        });
        this.importAccount = ({ backup, setItem, getItem, overwrite = false, }) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c;
            try {
                if (!backup) {
                    return err('No backup was provided for import.');
                }
                let accountBackup;
                if (typeof backup === 'string') {
                    try {
                        accountBackup = JSON.parse(backup);
                    }
                    catch (_d) {
                        return err('Invalid backup string.');
                    }
                }
                else if (typeof backup === 'object') {
                    accountBackup = backup;
                }
                else {
                    return err('Invalid backup. Unable to import.');
                }
                if (!(accountBackup === null || accountBackup === void 0 ? void 0 : accountBackup.account.name)) {
                    return err('No account name was provided in the accountBackup object.');
                }
                if (!(accountBackup === null || accountBackup === void 0 ? void 0 : accountBackup.account.seed)) {
                    return err('No seed was provided in the accountBackup object.');
                }
                if (!(accountBackup === null || accountBackup === void 0 ? void 0 : accountBackup.data)) {
                    return err('No data was provided in the accountBackup object.');
                }
                if (!(ELdkData.channelManager in accountBackup.data) ||
                    !(ELdkData.channelData in accountBackup.data) ||
                    !(ELdkData.peers in accountBackup.data) ||
                    !(ELdkData.networkGraph in accountBackup.data)) {
                    return err(`Invalid account backup data. Please ensure the following keys exist in the accountBackup object: ${ELdkData.channelManager}, ${ELdkData.channelData}, ${ELdkData.peers}, ${ELdkData.networkGraph}`);
                }
                const storageKeys = yield getAllStorageKeys(accountBackup.account.name);
                const timestamp = yield getItem(storageKeys[ELdkData.timestamp]);
                if (!overwrite && ((_b = accountBackup.data) === null || _b === void 0 ? void 0 : _b.timestamp) <= timestamp) {
                    const msg = ((_c = accountBackup.data) === null || _c === void 0 ? void 0 : _c.timestamp) < timestamp
                        ? 'This appears to be an old backup. The stored backup is more recent than the backup trying to be imported.'
                        : 'No need to import. The backup timestamps match.';
                    return err(msg);
                }
                const setAndGetCheckResponse = yield setAndGetMethodCheck({
                    setItem,
                    getItem,
                });
                if (setAndGetCheckResponse.isErr()) {
                    return err(setAndGetCheckResponse.error.message);
                }
                setItem(storageKeys[ELdkData.channelManager], JSON.stringify(accountBackup.data[ELdkData.channelManager]));
                setItem(storageKeys[ELdkData.channelData], JSON.stringify(accountBackup.data[ELdkData.channelData]));
                setItem(storageKeys[ELdkData.peers], JSON.stringify(accountBackup.data[ELdkData.peers]));
                setItem(storageKeys[ELdkData.networkGraph], JSON.stringify(accountBackup.data[ELdkData.networkGraph]));
                setItem(storageKeys[ELdkData.timestamp], JSON.stringify(accountBackup.data[ELdkData.timestamp]));
                return ok(accountBackup.account);
            }
            catch (e) {
                return err(e);
            }
        });
        this.backupAccount = ({ account, setItem, getItem, includeNetworkGraph = false, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!account || !(this === null || this === void 0 ? void 0 : this.account)) {
                    return err('No account provided. Please pass an account object containing the name & seed to the start method and try again.');
                }
                if (!account) {
                    account = this.account;
                }
                if (!(account === null || account === void 0 ? void 0 : account.name) || !(account === null || account === void 0 ? void 0 : account.seed)) {
                    return err('No account name or seed provided. Please pass an account object containing the name & seed to the start method and try again.');
                }
                const setAndGetCheckResponse = yield setAndGetMethodCheck({
                    setItem,
                    getItem,
                });
                if (setAndGetCheckResponse.isErr()) {
                    return err(setAndGetCheckResponse.error.message);
                }
                const storageKeys = yield getAllStorageKeys(account.name);
                const channelManager = yield getItem(storageKeys[ELdkData.channelManager]);
                const channelData = yield getItem(storageKeys[ELdkData.channelData]);
                const peers = yield getItem(storageKeys[ELdkData.peers]);
                const timestamp = yield getItem(storageKeys[ELdkData.timestamp]);
                let networkGraph = '';
                if (includeNetworkGraph) {
                    networkGraph = yield getItem(storageKeys[ELdkData.networkGraph]);
                    networkGraph = parseData(networkGraph, DefaultLdkDataShape[ELdkData.networkGraph]);
                }
                const accountBackup = {
                    account,
                    data: {
                        [ELdkData.channelManager]: parseData(channelManager, DefaultLdkDataShape[ELdkData.channelManager]),
                        [ELdkData.channelData]: parseData(channelData, DefaultLdkDataShape[ELdkData.channelData]),
                        [ELdkData.peers]: parseData(peers, DefaultLdkDataShape[ELdkData.peers]),
                        [ELdkData.networkGraph]: networkGraph,
                        [ELdkData.timestamp]: parseData(timestamp, DefaultLdkDataShape[ELdkData.timestamp]),
                    },
                };
                return ok(JSON.stringify(accountBackup));
            }
            catch (e) {
                return err(e);
            }
        });
        this.saveLdkChannelData = (channelId, data) => __awaiter(this, void 0, void 0, function* () {
            const storageKey = getLdkStorageKey(this.account.name, ELdkData.channelData);
            const channelData = yield this.getLdkChannelData();
            channelData[channelId] = data;
            this.updateStorage(storageKey, JSON.stringify(channelData));
        });
        this.saveLdkChannelManagerData = (data) => __awaiter(this, void 0, void 0, function* () {
            const storageKey = getLdkStorageKey(this.account.name, ELdkData.channelManager);
            this.updateStorage(storageKey, JSON.stringify(data));
        });
        this.saveLdkPeerData = (peer) => __awaiter(this, void 0, void 0, function* () {
            const peers = yield this.getPeers();
            const duplicatePeerArr = peers.filter((p) => p.pubKey === peer.pubKey && p.address === peer.address);
            if (duplicatePeerArr.length > 0) {
                return;
            }
            peers.push(peer);
            const storageKey = getLdkStorageKey(this.account.name, ELdkData.peers);
            this.updateStorage(storageKey, JSON.stringify(peers));
        });
        this.saveNetworkGraph = (data) => __awaiter(this, void 0, void 0, function* () {
            const storageKey = getLdkStorageKey(this.account.name, ELdkData.networkGraph);
            this.updateStorage(storageKey, JSON.stringify(data));
        });
        this.getLdkChannelManager = () => __awaiter(this, void 0, void 0, function* () {
            const ldkDataKey = ELdkData.channelManager;
            const storageKey = getLdkStorageKey(this.account.name, ldkDataKey);
            try {
                const ldkData = yield this.getItem(storageKey);
                return parseData(ldkData, DefaultLdkDataShape[ldkDataKey]);
            }
            catch (_e) {
                return DefaultLdkDataShape[ldkDataKey];
            }
        });
        this.getLdkChannelData = () => __awaiter(this, void 0, void 0, function* () {
            const ldkDataKey = ELdkData.channelData;
            const storageKey = getLdkStorageKey(this.account.name, ldkDataKey);
            try {
                const ldkData = yield this.getItem(storageKey);
                return parseData(ldkData, DefaultLdkDataShape[ldkDataKey]);
            }
            catch (_f) {
                return DefaultLdkDataShape[ldkDataKey];
            }
        });
        this.getLdkNetworkGraph = () => __awaiter(this, void 0, void 0, function* () {
            const ldkDataKey = ELdkData.networkGraph;
            const storageKey = getLdkStorageKey(this.account.name, ldkDataKey);
            try {
                const ldkData = yield this.getItem(storageKey);
                return parseData(ldkData, DefaultLdkDataShape[ldkDataKey]);
            }
            catch (_g) {
                return DefaultLdkDataShape[ldkDataKey];
            }
        });
        this.updateTimestamp = () => {
            const storageKey = getLdkStorageKey(this.account.name, ELdkData.timestamp);
            const date = Date.now();
            this.setItem(storageKey, JSON.stringify(date));
        };
        ldk.onEvent(EEventTypes.native_log, (line) => console.log(`NATIVE LOG: ${line}`));
        ldk.onEvent(EEventTypes.ldk_log, (line) => console.log(`LDK: ${line}`));
        ldk.onEvent(EEventTypes.register_tx, this.onRegisterTx.bind(this));
        ldk.onEvent(EEventTypes.register_output, this.onRegisterOutput.bind(this));
        ldk.onEvent(EEventTypes.broadcast_transaction, this.onBroadcastTransaction.bind(this));
        ldk.onEvent(EEventTypes.persist_manager, this.onPersistManager.bind(this));
        ldk.onEvent(EEventTypes.persist_new_channel, this.onPersistNewChannel.bind(this));
        ldk.onEvent(EEventTypes.persist_graph, this.onPersistGraph.bind(this));
        ldk.onEvent(EEventTypes.update_persisted_channel, this.onUpdatePersistedChannel.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_funding_generation_ready, this.onChannelManagerFundingGenerationReady.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_payment_received, this.onChannelManagerPaymentReceived.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_payment_sent, this.onChannelManagerPaymentSent.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_open_channel_request, this.onChannelManagerOpenChannelRequest.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_payment_path_successful, this.onChannelManagerPaymentPathSuccessful.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_payment_path_failed, this.onChannelManagerPaymentPathFailed.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_payment_failed, this.onChannelManagerPaymentFailed.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_pending_htlcs_forwardable, this.onChannelManagerPendingHtlcsForwardable.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_spendable_outputs, this.onChannelManagerSpendableOutputs.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_channel_closed, this.onChannelManagerChannelClosed.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_discard_funding, this.onChannelManagerDiscardFunding.bind(this));
        ldk.onEvent(EEventTypes.channel_manager_payment_claimed, this.onChannelManagerPaymentClaimed.bind(this));
    }
    start({ account, genesisHash, getBestBlock, getItem, setItem, getTransactionData, network = ENetworks.regtest, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!account) {
                return err('No account provided. Please pass an account object containing the name & seed to the start method and try again.');
            }
            if (!(account === null || account === void 0 ? void 0 : account.name) || !(account === null || account === void 0 ? void 0 : account.seed)) {
                return err('No account name or seed provided. Please pass an account object containing the name & seed to the start method and try again.');
            }
            if (!getBestBlock) {
                return err('getBestBlock method not specified in start method.');
            }
            if (!genesisHash) {
                return err('No genesisHash provided. Please pass genesisHash to the start method and try again.');
            }
            if (!setItem) {
                return err('No setItem method provided. Please pass setItem to the start method and try again.');
            }
            if (!getItem) {
                return err('No getItem method provided. Please pass getItem to the start method and try again.');
            }
            if (!getTransactionData) {
                return err('getTransactionData is not set in start method.');
            }
            const paramCheckResponse = yield startParamCheck({
                account,
                genesisHash,
                getBestBlock,
                getItem,
                setItem,
                getTransactionData,
                network,
            });
            if (paramCheckResponse.isErr()) {
                return err(paramCheckResponse.error.message);
            }
            this.getBestBlock = getBestBlock;
            this.account = account;
            this.network = network;
            this.setItem = setItem;
            this.updateStorage = (key, value) => {
                this.setItem(key, value);
                this.updateTimestamp();
            };
            this.getItem = getItem;
            this.getTransactionData = getTransactionData;
            const bestBlock = yield this.getBestBlock();
            this.currentBlock = bestBlock;
            this.watchTxs = [];
            this.watchOutputs = [];
            const feeUpdateRes = yield ldk.updateFees({
                highPriority: 1000,
                normal: 500,
                background: 250,
            });
            if (feeUpdateRes.isErr()) {
                return feeUpdateRes;
            }
            yield ldk.setLogLevel(ELdkLogLevels.info, true);
            yield ldk.setLogLevel(ELdkLogLevels.warn, true);
            yield ldk.setLogLevel(ELdkLogLevels.error, true);
            yield ldk.setLogLevel(ELdkLogLevels.debug, true);
            const chainMonitorRes = yield ldk.initChainMonitor();
            if (chainMonitorRes.isErr()) {
                return chainMonitorRes;
            }
            const keysManager = yield ldk.initKeysManager(this.account.seed);
            if (keysManager.isErr()) {
                return keysManager;
            }
            const networkGraph = yield this.getLdkNetworkGraph();
            if (networkGraph) {
                const networkGraphRes = yield ldk.initNetworkGraph({
                    serializedBackup: networkGraph,
                });
                if (networkGraphRes.isErr()) {
                    console.log(`Network graph restore failed (${networkGraphRes.error.message}). Syncing from scratch.`);
                    const newNetworkGraphRes = yield ldk.initNetworkGraph({ genesisHash });
                    if (newNetworkGraphRes.isErr()) {
                        return newNetworkGraphRes;
                    }
                }
            }
            else {
                const newNetworkGraphRes = yield ldk.initNetworkGraph({ genesisHash });
                if (newNetworkGraphRes.isErr()) {
                    return newNetworkGraphRes;
                }
            }
            const confRes = yield ldk.initConfig({
                acceptInboundChannels: true,
                manuallyAcceptInboundChannels: false,
                announcedChannels: false,
                minChannelHandshakeDepth: 1,
            });
            if (confRes.isErr()) {
                return confRes;
            }
            const channelManagerSerialized = yield this.getLdkChannelManager();
            const channelData = yield this.getLdkChannelData();
            const channelManagerRes = yield ldk.initChannelManager({
                network: this.network,
                channelManagerSerialized,
                channelMonitorsSerialized: Object.values(channelData),
                bestBlock,
            });
            if (channelManagerRes.isErr()) {
                return channelManagerRes;
            }
            const peers = yield this.getPeers();
            yield Promise.all(peers.map((peer) => {
                this.addPeer(Object.assign(Object.assign({}, peer), { timeout: 4000 }));
            }));
            yield this.syncLdk();
            return ok('Node running');
        });
    }
    syncLdk() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.getBestBlock) {
                return err('No getBestBlock method provided.');
            }
            const bestBlock = yield this.getBestBlock();
            const header = bestBlock === null || bestBlock === void 0 ? void 0 : bestBlock.hex;
            const height = bestBlock === null || bestBlock === void 0 ? void 0 : bestBlock.height;
            if (this.currentBlock.hash !== (bestBlock === null || bestBlock === void 0 ? void 0 : bestBlock.hash)) {
                const syncToTip = yield ldk.syncToTip({
                    header,
                    height,
                });
                if (syncToTip.isErr()) {
                    return syncToTip;
                }
                this.currentBlock = bestBlock;
            }
            yield Promise.all(this.watchTxs.map(({ txid }, i) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.getTransactionData(txid);
                if (!(response === null || response === void 0 ? void 0 : response.header) || !response.transaction) {
                    return err('Unable to retrieve transaction data from the getTransactionData method.');
                }
                if (response.height > 0) {
                    const pos = this.watchOutputs[i].index;
                    yield ldk.setTxConfirmed({
                        header: response.header,
                        height: response.height,
                        txData: [{ transaction: response.transaction, pos }],
                    });
                }
                else {
                    yield ldk.setTxUnconfirmed({
                        txId: txid,
                    });
                }
            })));
            return ok(`Synced to block ${height}`);
        });
    }
    onRegisterTx(res) {
        this.watchTxs.push(res);
    }
    onRegisterOutput(res) {
        this.watchOutputs.push(res);
    }
    onBroadcastTransaction(res) {
        console.log(`onBroadcastTransaction: ${res.tx}`);
    }
    onPersistManager(res) {
        this.saveLdkChannelManagerData(res.channel_manager)
            .then()
            .catch(console.error);
    }
    onPersistNewChannel(res) {
        this.saveLdkChannelData(res.id, res.data).then().catch(console.error);
    }
    onUpdatePersistedChannel(res) {
        this.saveLdkChannelData(res.id, res.data).then().catch(console.error);
    }
    onPersistGraph(res) {
        this.saveNetworkGraph(res.network_graph).then().catch(console.error);
    }
    onChannelManagerFundingGenerationReady(res) {
        console.log(`onChannelManagerFundingGenerationReady: ${JSON.stringify(res)}`);
    }
    onChannelManagerPaymentReceived(res) {
        if (res.spontaneous_payment_preimage) {
            ldk.claimFunds(res.spontaneous_payment_preimage).catch(console.error);
        }
        else {
            ldk.claimFunds(res.payment_preimage).catch(console.error);
        }
    }
    onChannelManagerPaymentSent(res) {
        console.log(`onChannelManagerPaymentSent: ${JSON.stringify(res)}`);
    }
    onChannelManagerOpenChannelRequest(res) {
        console.log(`onChannelManagerOpenChannelRequest: ${JSON.stringify(res)}`);
    }
    onChannelManagerPaymentPathSuccessful(res) {
        console.log(`onChannelManagerPaymentPathSuccessful: ${JSON.stringify(res)}`);
    }
    onChannelManagerPaymentPathFailed(res) {
        console.log(`onChannelManagerPaymentPathFailed: ${JSON.stringify(res)}`);
    }
    onChannelManagerPaymentFailed(res) {
        console.log(`onChannelManagerPaymentFailed: ${JSON.stringify(res)}`);
    }
    onChannelManagerPendingHtlcsForwardable(res) {
        ldk.processPendingHtlcForwards().catch(console.error);
    }
    onChannelManagerSpendableOutputs(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const spendRes = yield ldk.spendOutputs({
                descriptorsSerialized: res.outputsSerialized,
                outputs: [],
                change_destination_script: 'a91407694cfd2bd43f4e0fe285a4d013456cb58d7eab87',
                feerate_sat_per_1000_weight: 1000,
            });
            if (spendRes.isErr()) {
                console.error(spendRes.error);
                return;
            }
            this.onBroadcastTransaction({ tx: spendRes.value });
            console.log(`onChannelManagerSpendableOutputs: ${JSON.stringify(res)}`);
        });
    }
    onChannelManagerChannelClosed(res) {
        console.log(`onChannelManagerChannelClosed: ${JSON.stringify(res)}`);
    }
    onChannelManagerDiscardFunding(res) {
        console.log(`onChannelManagerDiscardFunding: ${JSON.stringify(res)}`);
    }
    onChannelManagerPaymentClaimed(res) {
        console.log(`onChannelManagerPaymentClaimed: ${JSON.stringify(res)}`);
    }
}
export default new LightningManager();
//# sourceMappingURL=lightning-manager.js.map