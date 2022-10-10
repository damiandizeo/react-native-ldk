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
    EEventTypes["backup"] = "backup";
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
    EEventTypes["emergency_force_close_channel"] = "emergency_force_close_channel";
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
    vout: [],
};
export var ELdkFiles;
(function (ELdkFiles) {
    ELdkFiles["seed"] = "seed";
    ELdkFiles["channel_manager"] = "channel_manager.bin";
    ELdkFiles["channels"] = "channels";
    ELdkFiles["peers"] = "peers.json";
    ELdkFiles["watch_transactions"] = "watch_transactions.json";
    ELdkFiles["watch_outputs"] = "watch_outputs.json";
    ELdkFiles["confirmed_transactions"] = "confirmed_transactions.json";
    ELdkFiles["confirmed_outputs"] = "confirmed_outputs.json";
    ELdkFiles["broadcasted_transactions"] = "broadcasted_transactions.json";
})(ELdkFiles || (ELdkFiles = {}));
export var ELdkData;
(function (ELdkData) {
    ELdkData["channel_manager"] = "channel_manager";
    ELdkData["channel_monitors"] = "channel_monitors";
    ELdkData["peers"] = "peers";
    ELdkData["confirmed_transactions"] = "confirmed_transactions";
    ELdkData["confirmed_outputs"] = "confirmed_outputs";
    ELdkData["broadcasted_transactions"] = "broadcasted_transactions";
    ELdkData["timestamp"] = "timestamp";
})(ELdkData || (ELdkData = {}));
export const DefaultLdkDataShape = {
    [ELdkData.channel_manager]: '',
    [ELdkData.channel_monitors]: {},
    [ELdkData.peers]: [],
    [ELdkData.confirmed_transactions]: [],
    [ELdkData.confirmed_outputs]: [],
    [ELdkData.broadcasted_transactions]: [],
    [ELdkData.timestamp]: 0,
};
//# sourceMappingURL=types.js.map