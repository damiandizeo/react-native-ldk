export declare enum ENetworks {
    regtest = "regtest",
    testnet = "testnet",
    mainnet = "mainnet"
}
export declare enum EEventTypes {
    ldk_log = "ldk_log",
    native_log = "native_log",
    register_tx = "register_tx",
    register_output = "register_output",
    broadcast_transaction = "broadcast_transaction",
    backup = "backup",
    channel_manager_funding_generation_ready = "channel_manager_funding_generation_ready",
    channel_manager_payment_received = "channel_manager_payment_received",
    channel_manager_payment_sent = "channel_manager_payment_sent",
    channel_manager_open_channel_request = "channel_manager_open_channel_request",
    channel_manager_payment_path_successful = "channel_manager_payment_path_successful",
    channel_manager_payment_path_failed = "channel_manager_payment_path_failed",
    channel_manager_payment_failed = "channel_manager_payment_failed",
    channel_manager_pending_htlcs_forwardable = "channel_manager_pending_htlcs_forwardable",
    channel_manager_spendable_outputs = "channel_manager_spendable_outputs",
    channel_manager_channel_closed = "channel_manager_channel_closed",
    channel_manager_discard_funding = "channel_manager_discard_funding",
    channel_manager_payment_claimed = "channel_manager_payment_claimed",
    emergency_force_close_channel = "emergency_force_close_channel"
}
export declare type TRegisterTxEvent = {
    txid: string;
    script_pubkey: string;
};
export declare type TRegisterOutputEvent = {
    block_hash: string;
    index: number;
    script_pubkey: string;
};
export declare type TBroadcastTransactionEvent = {
    tx: string;
};
export declare type TChannelManagerFundingGenerationReady = {
    temp_channel_id: string;
    output_script: string;
    user_channel_id: number;
    value_satoshis: number;
};
export declare type TChannelManagerPayment = {
    payment_hash: string;
    amount_sat: number;
    payment_preimage: string;
    payment_secret: string;
    spontaneous_payment_preimage: string;
};
export declare type TChannelManagerPaymentSent = {
    payment_id: string;
    payment_preimage: string;
    payment_hash: string;
    fee_paid_sat: number;
};
export declare type TChannelManagerOpenChannelRequest = {
    temp_channel_id: string;
    counterparty_node_id: string;
    push_sat: number;
    funding_satoshis: number;
    channel_type: string;
};
export declare type TEmergencyForceCloseChannel = {
    channel_id: string;
    counterparty_node_id: string;
};
declare type TPath = {
    pubkey: string;
    fee_sat: number;
    short_channel_id: number;
    cltv_expiry_delta: number;
};
export declare type TChannelManagerPaymentPathSuccessful = {
    payment_id: string;
    payment_hash: string;
    path: TPath[];
};
export declare type TChannelManagerPaymentPathFailed = {
    payment_id: string;
    payment_hash: string;
    rejected_by_dest: boolean;
    short_channel_id: string;
    path: TPath[];
    network_update: string;
};
export declare type TChannelManagerPaymentFailed = {
    payment_id: string;
    payment_hash: string;
};
export declare type TChannelManagerPendingHtlcsForwardable = {
    time_forwardable: number;
};
export declare type TChannelManagerSpendableOutputs = {
    outputsSerialized: string[];
};
export declare type TChannelManagerChannelClosed = {
    user_channel_id: number;
    channel_id: string;
    reason: string;
};
export declare type TChannelManagerDiscardFunding = {
    channel_id: string;
    tx: string;
};
export declare type TChannel = {
    channel_id: string;
    is_public: boolean;
    is_usable: boolean;
    is_outbound: boolean;
    balance_sat: number;
    counterparty_node_id: string;
    funding_txo?: string;
    channel_type?: string;
    user_channel_id: number;
    confirmations_required?: number;
    short_channel_id?: number;
    inbound_scid_alias?: number;
    inbound_payment_scid?: number;
    inbound_capacity_sat: number;
    outbound_capacity_sat: number;
    channel_value_satoshis: number;
    force_close_spend_delay?: number;
    unspendable_punishment_reserve?: number;
};
export declare type TNetworkGraphChannelInfo = {
    shortChannelId: string;
    capacity_sats?: number;
    node_one: string;
    node_two: string;
    one_to_two_fees_base_sats: number;
    one_to_two_fees_proportional_millionths: number;
    one_to_two_enabled: boolean;
    one_to_two_last_update: number;
    one_to_two_htlc_maximum_sats: number;
    one_to_two_htlc_minimum_sats: number;
    two_to_one_fees_base_sats: number;
    two_to_one_fees_proportional_millionths: number;
    two_to_one_enabled: boolean;
    two_to_one_last_update: number;
    two_to_one_htlc_maximum_sats: number;
    two_to_one_htlc_minimum_sats: number;
};
export declare type TNetworkGraphNodeInfo = {
    nodeId: string;
    shortChannelIds: string[];
};
export declare type TInvoice = {
    amount_satoshis?: number;
    description?: string;
    check_signature: boolean;
    is_expired: boolean;
    duration_since_epoch: number;
    expiry_time: number;
    min_final_cltv_expiry: number;
    payee_pub_key: string;
    recover_payee_pub_key: string;
    payment_hash: string;
    payment_secret: string;
    timestamp: number;
    features?: string;
    currency: number;
    to_str: string;
    route_hints: RouteHints[];
};
export declare type RouteHints = RouteHintHop[];
export declare type RouteHintHop = {
    src_node_id: string;
    short_channel_id: string;
};
export declare type TLogListener = {
    id: string;
    callback: (log: string) => void;
};
export declare type TFeeUpdateReq = {
    highPriority: number;
    normal: number;
    background: number;
};
export declare type TSyncTipReq = {
    header: string;
    height: number;
};
export declare type TPeer = {
    address: string;
    port: number;
    pubKey: string;
};
export declare type TAddPeerReq = {
    address: string;
    port: number;
    pubKey: string;
    timeout: number;
};
export declare type TSetTxConfirmedReq = {
    header: string;
    txData: {
        transaction: string;
        pos: number;
    }[];
    height: number;
};
export declare type TSetTxUnconfirmedReq = {
    txId: string;
};
export declare type TOpenChannelStep1Req = {
    pubkey: string;
    channelValue: number;
};
export declare type TOpenChannelStep2Req = {
    temporaryChannelId: string;
    counterPartyNodeId: string;
    txhex: string;
};
export declare type TAcceptInboundChannel = {
    temporaryChannelId: string;
    counterPartyNodeId: string;
    turboChannels: boolean;
};
export declare type TCloseChannelReq = {
    channelId: string;
    counterPartyNodeId: string;
    force?: boolean;
};
export declare type TSpendOutputsReq = {
    descriptorsSerialized: string[];
    outputs: {
        script_pubkey: string;
        value: number;
    }[];
    change_destination_script: string;
    feerate_sat_per_1000_weight: number;
};
export declare type TPaymentReq = {
    paymentRequest: string;
    amountSats?: number;
};
export declare type TCreatePaymentReq = {
    amountSats?: number;
    description: string;
    expiryDeltaSeconds: number;
};
export declare type TInitChannelManagerReq = {
    network: ENetworks;
    bestBlock: {
        hash: string;
        height: number;
    };
};
export declare type TInitNetworkGraphReq = {
    genesisHash: string;
};
export declare type TInitConfig = {
    acceptInboundChannels: boolean;
    manuallyAcceptInboundChannels: boolean;
    announcedChannels: boolean;
    minChannelHandshakeDepth: number;
};
export declare enum ELdkLogLevels {
    trace = 1,
    debug = 2,
    info = 3,
    warn = 4,
    error = 5
}
export declare type THeader = {
    hex: string;
    hash: string;
    height: number;
};
export declare type TTransactionData = {
    header: string;
    height: number;
    transaction: string;
    vout: TVout[];
};
export declare type TFileWriteReq = {
    fileName: string;
    path?: string;
    content: string;
    format?: 'hex' | 'string';
};
export declare type TFileReadReq = {
    fileName: string;
    format?: 'hex' | 'string';
    path?: string;
};
export declare type TFileReadRes = {
    content: string;
    timestamp: number;
};
export declare const DefaultTransactionDataShape: TTransactionData;
export declare type TGetTransactionData = (txid: string) => Promise<TTransactionData>;
export declare type TGetBestBlock = () => Promise<THeader>;
export declare enum ELdkFiles {
    seed = "seed",
    channel_manager = "channel_manager.bin",
    channels = "channels",
    peers = "peers.json",
    watch_transactions = "watch_transactions.json",
    watch_outputs = "watch_outputs.json",
    confirmed_transactions = "confirmed_transactions.json",
    confirmed_outputs = "confirmed_outputs.json",
    broadcasted_transactions = "broadcasted_transactions.json"
}
export declare enum ELdkData {
    channel_manager = "channel_manager",
    channel_monitors = "channel_monitors",
    peers = "peers",
    confirmed_transactions = "confirmed_transactions",
    confirmed_outputs = "confirmed_outputs",
    broadcasted_transactions = "broadcasted_transactions",
    timestamp = "timestamp"
}
export declare type TLdkData = {
    [ELdkData.channel_manager]: string;
    [ELdkData.channel_monitors]: {
        [key: string]: string;
    };
    [ELdkData.peers]: TLdkPeers;
    [ELdkData.confirmed_transactions]: TLdkConfirmedTransactions;
    [ELdkData.confirmed_outputs]: TLdkConfirmedOutputs;
    [ELdkData.broadcasted_transactions]: TLdkBroadcastedTransactions;
    [ELdkData.timestamp]: number;
};
export declare type TAccountBackup = {
    account: TAccount;
    package_version: string;
    data: TLdkData;
};
export declare type TLdkPeers = TPeer[];
export declare type TLdkConfirmedTransactions = string[];
export declare type TLdkConfirmedOutputs = string[];
export declare type TLdkBroadcastedTransactions = string[];
export declare const DefaultLdkDataShape: TLdkData;
export declare type TAvailableNetworks = 'bitcoin' | 'bitcoinTestnet' | 'bitcoinRegtest';
export declare type TAccount = {
    name: string;
    seed: string;
};
export declare type TLdkStart = {
    account: TAccount;
    genesisHash: string;
    getBestBlock: TGetBestBlock;
    getTransactionData: TGetTransactionData;
    getAddress: TGetAddress;
    getScriptPubKeyHistory: TGetScriptPubKeyHistory;
    broadcastTransaction: TBroadcastTransaction;
    network?: ENetworks;
    feeRate?: number;
};
export declare type TGetAddress = () => Promise<string>;
export declare type TGetScriptPubKeyHistory = (address: string) => Promise<TGetScriptPubKeyHistoryResponse[]>;
export declare type TGetScriptPubKeyHistoryResponse = {
    height: number;
    txid: string;
};
export declare type TBroadcastTransaction = (rawTx: string) => Promise<any>;
export declare type TVout = {
    hex: string;
    n: number;
    value: number;
};
export {};
