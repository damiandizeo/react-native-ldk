var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ENetworks } from './types';
import { err, ok } from './result';
import * as bitcoin from 'bitcoinjs-lib';
import { networks } from 'bitcoinjs-lib';
export const startParamCheck = ({ account, genesisHash, getBestBlock, getTransactionData, broadcastTransaction, getAddress, getScriptPubKeyHistory, network = ENetworks.regtest, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof network !== 'string') {
            return err('network must be a string.');
        }
        if (!(network === ENetworks.mainnet ||
            network === ENetworks.testnet ||
            network === ENetworks.regtest)) {
            return err(`The provided network (${network}) is invalid. It must be either '${ENetworks.mainnet}', '${ENetworks.testnet}' or '${ENetworks.regtest}'.`);
        }
        if (typeof account !== 'object') {
            return err('account must be an object.');
        }
        if (!(account === null || account === void 0 ? void 0 : account.name) || !(account === null || account === void 0 ? void 0 : account.seed)) {
            return err('account must contain both a name and seed.');
        }
        if (typeof genesisHash !== 'string') {
            return err('genesisHash must be a string.');
        }
        if (!isFunction(getBestBlock)) {
            return err('getBestBlock must be a function.');
        }
        const bestBlock = yield getBestBlock();
        if (!(bestBlock === null || bestBlock === void 0 ? void 0 : bestBlock.hex) || !bestBlock.height || !bestBlock.hash) {
            return err('getBestBlock is not providing the expected data.');
        }
        if (!isFunction(getTransactionData)) {
            return err('getTransactionData must be a function.');
        }
        if (!isFunction(getAddress)) {
            return err('getAddress must be a function.');
        }
        if (!isFunction(getScriptPubKeyHistory)) {
            return err('getScriptPubKeyHistory must be a function.');
        }
        if (!isFunction(broadcastTransaction)) {
            return err('broadcastTransaction must be a function.');
        }
        if (network !== ENetworks.regtest) {
            const expectedData = {
                [ENetworks.mainnet]: {
                    txid: '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098',
                    data: {
                        header: '010000006fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e61bc6649ffff001d01e36299',
                        height: 1,
                        transaction: '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d0104ffffffff0100f2052a0100000043410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac00000000',
                        vout: [
                            {
                                n: 0,
                                hex: '410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac',
                                value: 50,
                            },
                        ],
                    },
                },
                [ENetworks.testnet]: {
                    txid: 'f0315ffc38709d70ad5647e22048358dd3745f3ce3874223c80a7c92fab0c8ba',
                    data: {
                        header: '0100000043497fd7f826957108f4a30fd9cec3aeba79972084e90ead01ea330900000000bac8b0fa927c0ac8234287e33c5f74d38d354820e24756ad709d7038fc5f31f020e7494dffff001d03e4b672',
                        height: 1,
                        transaction: '01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0e0420e7494d017f062f503253482fffffffff0100f2052a010000002321021aeaf2f8638a129a3156fbe7e5ef635226b0bafd495ff03afe2c843d7e3a4b51ac00000000',
                        vout: [
                            {
                                n: 0,
                                hex: '21021aeaf2f8638a129a3156fbe7e5ef635226b0bafd495ff03afe2c843d7e3a4b51ac',
                                value: 50,
                            },
                        ],
                    },
                },
            };
            const transactionData = yield getTransactionData(expectedData[network].txid);
            if (JSON.stringify(transactionData) !==
                JSON.stringify(expectedData[network].data)) {
                return err('getTransactionData is not returning the expected data.');
            }
            const address = yield getAddress();
            if (typeof address !== 'string') {
                return err('getAddress is not returning the expected data.');
            }
            if (!validateAddress({ address, network })) {
                return err(`getAddress is not returning valid addresses (${address}) for the specified network (${network}).`);
            }
        }
        return ok('Params passed all checks.');
    }
    catch (e) {
        return err(e);
    }
});
const validateAddress = ({ address = '', network = ENetworks.mainnet, }) => {
    try {
        bitcoin.address.toOutputScript(address, networks[network]);
        return true;
    }
    catch (e) {
        return false;
    }
};
const isFunction = (f) => {
    try {
        return f && {}.toString.call(f) === '[object Function]';
    }
    catch (_a) {
        return false;
    }
};
export const parseData = (data, fallback) => {
    try {
        return data ? JSON.parse(data) : fallback;
    }
    catch (_a) {
        return fallback;
    }
};
export const appendPath = (path1, path2) => {
    return `${path1}${path1.slice(-1) === '/' ? '' : '/'}${path2}`;
};
//# sourceMappingURL=helpers.js.map