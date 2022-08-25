import { Result } from './utils/result';
import { ENetworks, TAccount, TAccountBackup, TAddPeerReq, TGetBestBlock, TGetTransactionData, THeader, TLdkPeers, TLdkStart, TPeer, TRegisterOutputEvent, TRegisterTxEvent, TStorage } from './utils/types';
declare class LightningManager {
    currentBlock: THeader;
    watchTxs: TRegisterTxEvent[];
    watchOutputs: TRegisterOutputEvent[];
    getBestBlock: TGetBestBlock;
    account: TAccount;
    getItem: TStorage;
    setItem: TStorage;
    updateStorage: TStorage;
    getTransactionData: TGetTransactionData;
    network: ENetworks;
    constructor();
    start({ account, genesisHash, getBestBlock, getItem, setItem, getTransactionData, network, }: TLdkStart): Promise<Result<string>>;
    syncLdk(): Promise<Result<string>>;
    addPeer: ({ pubKey, address, port, timeout, }: TAddPeerReq) => Promise<Result<string>>;
    removePeer: ({ pubKey, address, port, }: TAddPeerReq) => Promise<Result<TPeer[]>>;
    getPeers: () => Promise<TLdkPeers>;
    importAccount: ({ backup, setItem, getItem, overwrite, }: {
        backup: string | TAccountBackup;
        setItem: TStorage;
        getItem: TStorage;
        overwrite?: boolean | undefined;
    }) => Promise<Result<TAccount>>;
    backupAccount: ({ account, setItem, getItem, includeNetworkGraph, }: {
        account: TAccount;
        setItem: TStorage;
        getItem: TStorage;
        includeNetworkGraph?: boolean | undefined;
    }) => Promise<Result<string>>;
    private saveLdkChannelData;
    private saveLdkChannelManagerData;
    private saveLdkPeerData;
    private saveNetworkGraph;
    private getLdkChannelManager;
    private getLdkChannelData;
    private getLdkNetworkGraph;
    private updateTimestamp;
    private onRegisterTx;
    private onRegisterOutput;
    private onBroadcastTransaction;
    private onPersistManager;
    private onPersistNewChannel;
    private onUpdatePersistedChannel;
    private onPersistGraph;
    private onChannelManagerFundingGenerationReady;
    private onChannelManagerPaymentReceived;
    private onChannelManagerPaymentSent;
    private onChannelManagerOpenChannelRequest;
    private onChannelManagerPaymentPathSuccessful;
    private onChannelManagerPaymentPathFailed;
    private onChannelManagerPaymentFailed;
    private onChannelManagerPendingHtlcsForwardable;
    private onChannelManagerSpendableOutputs;
    private onChannelManagerChannelClosed;
    private onChannelManagerDiscardFunding;
    private onChannelManagerPaymentClaimed;
}
declare const _default: LightningManager;
export default _default;
