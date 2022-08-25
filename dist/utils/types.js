export var ENetworks;
(function (ENetworks) {
    ENetworks["regtest"] = "regtest";
    ENetworks["testnet"] = "testnet";
    ENetworks["mainnet"] = "mainnet";
})(ENetworks || (ENetworks = {}));
export var EEventTypes;
(function (EEventTypes) {
    EEventTypes["ldk_log"] = "ldk_log";
    EEventTypes["native_log"] = "native_log";
    EEventTypes["register_tx"] = "register_tx";
    EEventTypes["register_output"] = "register_output";
    EEventTypes["broadcast_transaction"] = "broadcast_transaction";
    EEventTypes["persist_manager"] = "persist_manager";
    EEventTypes["persist_new_channel"] = "persist_new_channel";
    EEventTypes["persist_graph"] = "persist_graph";
    EEventTypes["update_persisted_channel"] = "update_persisted_channel";
    EEventTypes["channel_manager_funding_generation_ready"] = "channel_manager_funding_generation_ready";
    EEventTypes["channel_manager_payment_received"] = "channel_manager_payment_received";
    EEventTypes["channel_manager_payment_sent"] = "channel_manager_payment_sent";
    EEventTypes["channel_manager_open_channel_request"] = "channel_manager_open_channel_request";
    EEventTypes["channel_manager_payment_path_successful"] = "channel_manager_payment_path_successful";
    EEventTypes["channel_manager_payment_path_failed"] = "channel_manager_payment_path_failed";
    EEventTypes["channel_manager_payment_failed"] = "channel_manager_payment_failed";
    EEventTypes["channel_manager_pending_htlcs_forwardable"] = "channel_manager_pending_htlcs_forwardable";
    EEventTypes["channel_manager_spendable_outputs"] = "channel_manager_spendable_outputs";
    EEventTypes["channel_manager_channel_closed"] = "channel_manager_channel_closed";
    EEventTypes["channel_manager_discard_funding"] = "channel_manager_discard_funding";
    EEventTypes["channel_manager_payment_claimed"] = "channel_manager_payment_claimed";
})(EEventTypes || (EEventTypes = {}));
export var ELdkLogLevels;
(function (ELdkLogLevels) {
    ELdkLogLevels[ELdkLogLevels["trace"] = 1] = "trace";
    ELdkLogLevels[ELdkLogLevels["debug"] = 2] = "debug";
    ELdkLogLevels[ELdkLogLevels["info"] = 3] = "info";
    ELdkLogLevels[ELdkLogLevels["warn"] = 4] = "warn";
    ELdkLogLevels[ELdkLogLevels["error"] = 5] = "error";
})(ELdkLogLevels || (ELdkLogLevels = {}));
export const DefaultTransactionDataShape = {
    header: '',
    height: 0,
    transaction: '',
};
export var ELdkStorage;
(function (ELdkStorage) {
    ELdkStorage["key"] = "LDKStorage";
})(ELdkStorage || (ELdkStorage = {}));
export var ELdkData;
(function (ELdkData) {
    ELdkData["channelManager"] = "channelManager";
    ELdkData["channelData"] = "channelData";
    ELdkData["peers"] = "peers";
    ELdkData["networkGraph"] = "networkGraph";
    ELdkData["timestamp"] = "timestamp";
})(ELdkData || (ELdkData = {}));
export const DefaultLdkDataShape = {
    [ELdkData.channelManager]: '',
    [ELdkData.channelData]: {},
    [ELdkData.peers]: [],
    [ELdkData.networkGraph]: '',
    [ELdkData.timestamp]: 0,
};
//# sourceMappingURL=types.js.map