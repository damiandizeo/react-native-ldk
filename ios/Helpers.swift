//
//  Helpers.swift
//  react-native-ldk
//
//  Created by Jason van den Berg on 2022/05/10.
//
import Foundation
import LightningDevKit

func handleResolve(_ resolve: RCTPromiseResolveBlock, _ res: LdkCallbackResponses) {
    LdkEventEmitter.shared.send(withEvent: .native_log, body: "Success: \(res.rawValue)")
    resolve(res.rawValue)
}

func handleReject(_ reject: RCTPromiseRejectBlock, _ ldkError: LdkErrors, _ error: Error? = nil, _ message: String? = nil) {
    if let error = error as? NSError {
        LdkEventEmitter.shared.send(withEvent: .native_log, body: "Error: \(error.localizedDescription). Message: '\(message ?? "")'")
        reject(ldkError.rawValue, message ?? error.localizedDescription, error)
        return
    }
    
    LdkEventEmitter.shared.send(withEvent: .native_log, body: "Error: \(ldkError.rawValue). Message: '\(message ?? "")'")
    reject(ldkError.rawValue, message ?? ldkError.rawValue, NSError(domain: ldkError.rawValue, code: ldkError.hashValue))
}

extension Invoice {
    var asJson: Any {
        return [
            "amount_satoshis": amount_milli_satoshis().getValue() != nil ? amount_milli_satoshis().getValue()! / 1000 : nil,
            "description": into_signed_raw().raw_invoice().description(),
            "check_signature": check_signature().isOk(),
            "is_expired": is_expired(),
            "duration_since_epoch": duration_since_epoch(),
            "expiry_time": expiry_time(),
            "min_final_cltv_expiry": min_final_cltv_expiry(),
            "payee_pub_key": Data(payee_pub_key()).hexEncodedString(),
            "recover_payee_pub_key": Data(recover_payee_pub_key()).hexEncodedString(),
            "payment_hash": Data(payment_hash()).hexEncodedString(),
            "payment_secret": Data(payment_secret()).hexEncodedString(),
            "timestamp": timestamp(),
            "features": Data(features().write()).hexEncodedString(),
            "currency": currency().rawValue,
            "to_str": to_str(),
            "route_hints": route_hints().map({ $0.get_a().map({ $0.asJson }) }),
        ]
    }
}

extension RouteHintHop {
    var asJson: Any {
        return [
            "src_node_id": Data(get_src_node_id()).hexEncodedString(),
            "short_channel_id": String(get_short_channel_id())
        ]
    }
}

//Our own channels
extension ChannelDetails {
    var asJson: Any {
        return [
            "channel_id": Data(get_channel_id()).hexEncodedString(),
            "is_public": get_is_public(),
            "is_usable": get_is_usable(),
            "is_channel_ready": get_is_channel_ready(),
            "is_outbound": get_is_outbound(),
            "balance_sat": get_balance_msat() / 1000,
            "counterparty_node_id": Data(get_counterparty().get_node_id()).hexEncodedString(),
            "funding_txo": Data(get_funding_txo()?.write() ?? []).hexEncodedString(),
            "channel_type": Data(get_channel_type().write()).hexEncodedString(),
            "user_channel_id": get_user_channel_id(), //Number
            "confirmations_required": get_confirmations_required().getValue() as Any, // Optional number
            "short_channel_id": get_short_channel_id().getValue() as Any, //Optional number
            "inbound_scid_alias": get_inbound_scid_alias().getValue() as Any, //Optional number
            "inbound_payment_scid": get_inbound_payment_scid().getValue() as Any, //Optional number,
            "inbound_capacity_sat": get_inbound_capacity_msat() / 1000,
            "outbound_capacity_sat": get_outbound_capacity_msat() / 1000,
            "channel_value_satoshis": get_channel_value_satoshis(),
            "force_close_spend_delay": get_force_close_spend_delay().getValue() as Any, //Optional number
            "unspendable_punishment_reserve": get_unspendable_punishment_reserve().getValue() as Any //Optional number
        ]
    }
}

//Channels in our network graph
extension ChannelInfo {
    var asJson: Any {
        return [
            "capacity_sats": get_capacity_sats().getValue() as Any, //Optional number
            "node_one": Data(get_node_one().as_slice()).hexEncodedString(), //String
            "node_two": Data(get_node_two().as_slice()).hexEncodedString(), //String
            "one_to_two_fees_base_sats": get_one_to_two().get_fees().get_base_msat() / 1000, //Number
            "one_to_two_fees_proportional_millionths": get_one_to_two().get_fees().get_proportional_millionths(), //Number
            "one_to_two_enabled": get_one_to_two().get_enabled(), //Bool
            "one_to_two_last_update": get_one_to_two().get_last_update(), //Number
            "one_to_two_htlc_maximum_sats": get_one_to_two().get_htlc_maximum_msat() / 1000, //Number
            "one_to_two_htlc_minimum_sats": get_one_to_two().get_htlc_minimum_msat() / 1000, //Number
            "two_to_one_fees_base_sats": get_two_to_one().get_fees().get_base_msat() / 1000, //Number
            "two_to_one_fees_proportional_millionths": get_two_to_one().get_fees().get_proportional_millionths(), //Number
            "two_to_one_enabled": get_two_to_one().get_enabled(), //Bool
            "two_to_one_last_update": get_two_to_one().get_last_update(), //Number
            "two_to_one_htlc_maximum_sats": get_two_to_one().get_htlc_maximum_msat() / 1000, //Number
            "two_to_one_htlc_minimum_sats": get_two_to_one().get_htlc_minimum_msat() / 1000, //Number
        ]
    }
}

//Nodes in our network graph
extension NodeInfo {
    var asJson: Any {
        return [
            "shortChannelIds": get_channels().map({ String($0) }),
            //TODO gathering other details results in EXC_BAD_ACCESS. Test with next version of LDK.
        ]
    }
}

extension LightningDevKit.RouteHop {
    var asJson: Any {
        return [
            "pubkey": Data(get_pubkey()).hexEncodedString(),
            "fee_sat": get_fee_msat() / 1000,
            "short_channel_id": get_short_channel_id(),
            "cltv_expiry_delta": get_cltv_expiry_delta()
        ]
    }
}

extension Data {
    struct HexEncodingOptions: OptionSet {
        let rawValue: Int
        static let upperCase = HexEncodingOptions(rawValue: 1 << 0)
    }

    func hexEncodedString(options: HexEncodingOptions = []) -> String {
        let format = options.contains(.upperCase) ? "%02hhX" : "%02hhx"
        return map { String(format: format, $0) }.joined()
    }
}

extension StringProtocol {
    var hexaData: Data { .init(hexa) }
    var hexaBytes: [UInt8] { .init(hexa) }
    private var hexa: UnfoldSequence<UInt8, Index> {
        sequence(state: startIndex) { startIndex in
            guard startIndex < endIndex else { return nil }
            let endIndex = index(startIndex, offsetBy: 2, limitedBy: endIndex) ?? endIndex
            defer { startIndex = endIndex }
            return UInt8(self[startIndex..<endIndex], radix: 16)
        }
    }
}

//MARK: Module can be initialised on main thread as LDK handles all it's own tasks on background threads  (https://reactnative.dev/docs/native-modules-ios#implementing--requiresmainqueuesetup)
extension Ldk {
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

extension LdkEventEmitter {
    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
