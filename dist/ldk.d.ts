import { EmitterSubscription } from 'react-native';
import { Result } from './utils/result';
import { EEventTypes, ELdkLogLevels, TAddPeerReq, TChannel, TInvoice, TFeeUpdateReq, TInitChannelManagerReq, TInitConfig, TPaymentReq, TSyncTipReq, TCreatePaymentReq, TSetTxConfirmedReq, TSetTxUnconfirmedReq, TInitNetworkGraphReq, TCloseChannelReq, TSpendOutputsReq } from './utils/types';
declare class LDK {
    private readonly logListeners;
    private readonly ldkEvent;
    constructor();
    initChainMonitor(): Promise<Result<string>>;
    initKeysManager(seed: string): Promise<Result<string>>;
    loadChannelMonitors(channelMonitors: string[]): Promise<Result<string>>;
    initNetworkGraph({ serializedBackup, genesisHash, }: TInitNetworkGraphReq): Promise<Result<string>>;
    initConfig({ acceptInboundChannels, manuallyAcceptInboundChannels, announcedChannels, minChannelHandshakeDepth, }: TInitConfig): Promise<Result<string>>;
    initChannelManager({ network, channelManagerSerialized, channelMonitorsSerialized, bestBlock, }: TInitChannelManagerReq): Promise<Result<string>>;
    reset(): Promise<Result<string>>;
    setLogLevel(level: ELdkLogLevels, active: boolean): Promise<Result<string>>;
    setLogFilePath(path: string): Promise<Result<string>>;
    updateFees({ highPriority, normal, background, }: TFeeUpdateReq): Promise<Result<string>>;
    syncToTip({ header, height }: TSyncTipReq): Promise<Result<string>>;
    addPeer({ pubKey, address, port, timeout, }: TAddPeerReq): Promise<Result<string>>;
    setTxConfirmed({ header, txData, height, }: TSetTxConfirmedReq): Promise<Result<string>>;
    setTxUnconfirmed({ txId, }: TSetTxUnconfirmedReq): Promise<Result<string>>;
    closeChannel({ channelId, counterPartyNodeId, force, }: TCloseChannelReq): Promise<Result<string>>;
    spendOutputs({ descriptorsSerialized, outputs, change_destination_script, feerate_sat_per_1000_weight, }: TSpendOutputsReq): Promise<Result<string>>;
    decode({ paymentRequest }: TPaymentReq): Promise<Result<TInvoice>>;
    createPaymentRequest({ amountSats, description, expiryDeltaSeconds, }: TCreatePaymentReq): Promise<Result<TInvoice>>;
    processPendingHtlcForwards(): Promise<Result<string>>;
    claimFunds(paymentPreimage: string): Promise<Result<string>>;
    pay({ paymentRequest, amountSats, }: TPaymentReq): Promise<Result<string>>;
    onEvent(event: EEventTypes, callback: (res: any) => void): EmitterSubscription;
    version(): Promise<Result<{
        c_bindings: string;
        ldk: string;
    }>>;
    nodeId(): Promise<Result<string>>;
    listPeers(): Promise<Result<string[]>>;
    listChannels(): Promise<Result<TChannel[]>>;
    listUsableChannels(): Promise<Result<TChannel[]>>;
}
declare const _default: LDK;
export default _default;