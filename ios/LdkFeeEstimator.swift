//
//  LdkfeeEstimator.swift
//  react-native-ldk
//
//  Created by Jason van den Berg on 2022/05/10.
//

import Foundation
import LDKFramework

class LdkFeeEstimator: FeeEstimator {
    var high: UInt32 = 0
    var normal: UInt32 = 0
    var low: UInt32 = 0

    init(high: UInt32, normal: UInt32, low: UInt32) {
        self.high = high
        self.normal = normal
        self.low = low
        super.init()
    }
    
    override func get_est_sat_per_1000_weight(confirmation_target: LDKConfirmationTarget) -> UInt32 {
        let target = confirmation_target
        
        if case LDKConfirmationTarget_HighPriority = target {
            return high
        }
        
        if case LDKConfirmationTarget_Normal = target {
            return normal
        }
        
        if case LDKConfirmationTarget_Background = target {
            return low
        }
       
        return UInt32(1)
    }
}
