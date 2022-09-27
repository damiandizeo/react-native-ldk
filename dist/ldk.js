var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { NativeModules, NativeEventEmitter, Platform, } from 'react-native';
import { err, ok } from './utils/result';
const LINKING_ERROR = "The package 'react-native-ldk' doesn't seem to be linked. Make sure: \n\n" +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo managed workflow\n';
const NativeLDK = (_a = NativeModules === null || NativeModules === void 0 ? void 0 : NativeModules.Ldk) !== null && _a !== void 0 ? _a : new Proxy({}, {
    get() {
        throw new Error(LINKING_ERROR);
    },
});
class LDK {
    constructor() {
        this.logListeners = [];
        this.ldkEvent = new NativeEventEmitter(NativeModules.LdkEventEmitter);
    }
    initChainMonitor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.initChainMonitor();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    initKeysManager(seed) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.initKeysManager(seed);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    loadChannelMonitors(channelMonitors) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.loadChannelMonitors(channelMonitors);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    initNetworkGraph({ serializedBackup, genesisHash, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!serializedBackup && !genesisHash) {
                return err('Must provide serializedBackup or genesisHash as a backup');
            }
            try {
                const res = yield NativeLDK.initNetworkGraph(genesisHash || '', serializedBackup || '');
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    initConfig({ acceptInboundChannels, manuallyAcceptInboundChannels, announcedChannels, minChannelHandshakeDepth, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.initConfig(acceptInboundChannels, manuallyAcceptInboundChannels, announcedChannels, minChannelHandshakeDepth);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    initChannelManager({ network, channelManagerSerialized, channelMonitorsSerialized, bestBlock, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.initChannelManager(network, channelManagerSerialized, channelMonitorsSerialized, bestBlock.hash, bestBlock.height);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.reset();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    setLogLevel(level, active) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.setLogLevel(level, active);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    setLogFilePath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.setLogFilePath(path);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    updateFees({ highPriority, normal, background, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.updateFees(highPriority, normal, background);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    syncToTip({ header, height }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.syncToTip(header, height);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    addPeer({ pubKey, address, port, timeout, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.addPeer(address, port, pubKey, timeout);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    setTxConfirmed({ header, txData, height, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.setTxConfirmed(header, txData, height);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    setTxUnconfirmed({ txId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.setTxUnconfirmed(txId);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    openChannelStep1({ pubkey, channelValue, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.openChannelStep1(pubkey, channelValue);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    openChannelStep2({ temporaryChannelId, counterPartyNodeId, txhex, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.openChannelStep2(temporaryChannelId, counterPartyNodeId, txhex);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    acceptInboundChannel({ temporaryChannelId, counterPartyNodeId, turboChannels }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.acceptInboundChannel(temporaryChannelId, counterPartyNodeId, turboChannels);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    closeChannel({ channelId, counterPartyNodeId, force, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.closeChannel(channelId, counterPartyNodeId, !!force);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    spendOutputs({ descriptorsSerialized, outputs, change_destination_script, feerate_sat_per_1000_weight, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.spendOutputs(descriptorsSerialized, outputs, change_destination_script, feerate_sat_per_1000_weight);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    decode({ paymentRequest }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.decode(paymentRequest);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    createPaymentRequest({ amountSats, description, expiryDeltaSeconds, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.createPaymentRequest((amountSats || 0) * 1000, description, expiryDeltaSeconds);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    processPendingHtlcForwards() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.processPendingHtlcForwards();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    claimFunds(paymentPreimage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.claimFunds(paymentPreimage);
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    pay({ paymentRequest, amountSats, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelsRes = yield this.listUsableChannels();
            if (channelsRes.isOk() && channelsRes.value.length === 0) {
                return err('No usable channels found');
            }
            try {
                const res = yield NativeLDK.pay(paymentRequest, amountSats || 0);
                return ok(res);
            }
            catch (e) {
                let resultError = err(e);
                if (resultError.code === 'invoice_payment_fail_routing') {
                    const decodedRes = yield this.decode({ paymentRequest });
                    if (decodedRes.isErr()) {
                        return err(e);
                    }
                    const { route_hints, recover_payee_pub_key, amount_satoshis } = decodedRes.value;
                    let useFullMessage = `${resultError.error.message}.`;
                    if (route_hints.length === 0) {
                        useFullMessage = `${useFullMessage} No route hints found in payment request.`;
                    }
                    const graphRes = yield this.networkGraphListNodes();
                    if (graphRes.isOk()) {
                        let nodeInNetworkGraph = false;
                        graphRes.value.forEach((node) => {
                            if (node === recover_payee_pub_key) {
                                nodeInNetworkGraph = true;
                            }
                        });
                        if (!nodeInNetworkGraph) {
                            useFullMessage = `${useFullMessage} Node not found in network graph.`;
                        }
                    }
                    if (channelsRes.isOk()) {
                        let highestOutgoing = 0;
                        channelsRes.value.forEach(({ outbound_capacity_sat }) => {
                            if (outbound_capacity_sat > highestOutgoing) {
                                highestOutgoing = outbound_capacity_sat;
                            }
                        });
                        let amountToSendSats = amountSats || amount_satoshis || 0;
                        if (amountToSendSats > highestOutgoing) {
                            useFullMessage = `${useFullMessage} Not enough outgoing capacity.`;
                        }
                    }
                    return err(useFullMessage);
                }
                return err(e);
            }
        });
    }
    onEvent(event, callback) {
        return this.ldkEvent.addListener(event, callback);
    }
    version() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.version();
                return ok(JSON.parse(res));
            }
            catch (e) {
                return err(e);
            }
        });
    }
    nodeId() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.nodeId();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    listPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.listPeers();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    listChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.listChannels();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    listUsableChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.listUsableChannels();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    networkGraphListNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.networkGraphListNodes();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    networkGraphNode(nodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.networkGraphNode(nodeId);
                return ok(Object.assign(Object.assign({}, res), { nodeId }));
            }
            catch (e) {
                return err(e);
            }
        });
    }
    completeGraphNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.networkGraphListNodes();
                let nodes = [];
                if (res.isErr()) {
                    return err(res.error);
                }
                for (let index = 0; index < res.value.length; index++) {
                    const nodeRes = yield this.networkGraphNode(res.value[index]);
                    if (nodeRes.isErr()) {
                        return err(nodeRes.error);
                    }
                    nodes.push(nodeRes.value);
                }
                return ok(nodes);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    networkGraphListChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.networkGraphListChannels();
                return ok(res);
            }
            catch (e) {
                return err(e);
            }
        });
    }
    networkGraphChannel(shortChannelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield NativeLDK.networkGraphChannel(shortChannelId);
                return ok(Object.assign(Object.assign({}, res), { shortChannelId }));
            }
            catch (e) {
                return err(e);
            }
        });
    }
    completeGraphChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.networkGraphListChannels();
                let channels = [];
                if (res.isErr()) {
                    return err(res.error);
                }
                for (let index = 0; index < res.value.length; index++) {
                    const channelRes = yield this.networkGraphChannel(res.value[index]);
                    if (channelRes.isErr()) {
                        return err(channelRes.error);
                    }
                    channels.push(channelRes.value);
                }
                return ok(channels);
            }
            catch (e) {
                return err(e);
            }
        });
    }
}
export default new LDK();
//# sourceMappingURL=ldk.js.map