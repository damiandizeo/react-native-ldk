var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DefaultLdkDataShape, ELdkData, ELdkStorage, ENetworks, } from './types';
import { err, ok } from './result';
export const stringToBytes = (str) => {
    return Uint8Array.from(str, (x) => x.charCodeAt(0));
};
export const bytesToString = (bytes) => {
    const arr = [];
    bytes.forEach((n) => arr.push(n));
    return String.fromCharCode.apply(String, arr);
};
export const hexStringToBytes = (hexString) => {
    var _a;
    return new Uint8Array(((_a = hexString.match(/.{1,2}/g)) !== null && _a !== void 0 ? _a : []).map((byte) => parseInt(byte, 16)));
};
export const toCaps = (value = '', separator = ' ', split = '-') => {
    return value
        .split(split)
        .map((v) => v.charAt(0).toUpperCase() + v.substring(1))
        .reduce((a, b) => `${a}${separator}${b}`);
};
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
export const btoa = (input) => {
    let str = input;
    let output = '';
    for (let block = 0, charCode, i = 0, map = chars; str.charAt(i | 0) || ((map = '='), i % 1); output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))) {
        charCode = str.charCodeAt((i += 3 / 4));
        if (charCode > 0xff) {
            throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = (block << 8) | charCode;
    }
    return output;
};
export const getDefaultLdkStorageShape = (seed) => {
    return {
        [seed]: DefaultLdkDataShape,
    };
};
export const startParamCheck = ({ account, genesisHash, getBestBlock, getItem, setItem, getTransactionData, network = ENetworks.regtest, }) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (typeof genesisHash !== 'string') {
            return err('genesisHash must be a string.');
        }
        if (!isFunction(getBestBlock)) {
            return err('getBestBlock must be a function.');
        }
        const bestBlock = yield getBestBlock();
        if (!(bestBlock === null || bestBlock === void 0 ? void 0 : bestBlock.hex) || !bestBlock.height || !bestBlock.hash) {
            return err('getBestBlock is not providing the expected data.}');
        }
        const setAndGetCheckResponse = yield setAndGetMethodCheck({
            setItem,
            getItem,
        });
        if (setAndGetCheckResponse.isErr()) {
            return err(setAndGetCheckResponse.error.message);
        }
        if (!isFunction(getTransactionData)) {
            return err('getTransactionData must be a function.');
        }
        if (network !== ENetworks.regtest) {
            const expectedData = {
                [ENetworks.mainnet]: {
                    txid: 'f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16',
                    data: {
                        header: '01000000696aa63f0f22d9189c8536bb83b18737ae8336c25a67937f79957e5600000000982db9870a5e30d8f0b2a4ebccc5852b5a1e2413e9274c4947bfec6bdaa9b9d75bb76a49ffff001d2b719fdd',
                        height: 170,
                        transaction: '0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000',
                    },
                },
                [ENetworks.testnet]: {
                    txid: '3757bc9ac72b4aba0babe9c5ee94373c6b8c675766b7c188af4c5e75068b78e3',
                    data: {
                        header: '0100000098fbe05200b867e000286338ee405f70ce4362f54769db2bc9d919db0000000078b787d3d8da61dce5a9fe4d4a9232e804021e439906e6fd52cf8f041f948b3d919d4a4dffff001d05774a61',
                        height: 420,
                        transaction: '0100000001d604a444f1b98c382cb0557c4972d2d0050e19a570f0c9592a8afd40e6eea450000000006a47304402205df0be0956dcd01ab514a6965faabe6a0202289ef9ca16a60fb17612ba23598902202c877276bb12e5c7e27f377e926bebe3afa6629c1785a732a26df4322a83eae7012102219f426bcf9151bb514807f6c1796361a6abf6e094a2e75da0ed91f587c07b37ffffffff02302f1526010000001976a9145c7f849d51b5708ec29d38fdce2e995da069e01588ac5dfd01000000000017a914c925e02c0560da5d9cd263481347b025b8f196f48700000000',
                    },
                },
            };
            const transactionData = yield getTransactionData(expectedData[network].txid);
            if (JSON.stringify(transactionData) !==
                JSON.stringify(expectedData[network].data)) {
                return err('getTransactionData is not returning the expected data.');
            }
        }
        return ok('Params passed all checks.');
    }
    catch (e) {
        return err(e);
    }
});
const isFunction = (f) => {
    try {
        return f && {}.toString.call(f) === '[object Function]';
    }
    catch (_a) {
        return false;
    }
};
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
};
export const setAndGetMethodCheck = ({ setItem, getItem, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!setItem || !isFunction(setItem)) {
        return err('setItem must be a function.');
    }
    if (!getItem || !isFunction(getItem)) {
        return err('getItem must be a function.');
    }
    const rand = Math.random().toString();
    yield setItem('ldkstoragetest', rand);
    const getTest = yield getItem('ldkstoragetest');
    if (getTest !== rand) {
        return err('setItem & getItem are not able to access storage.');
    }
    return ok(true);
});
export const getLdkStorageKey = (accountName, ldkDataKey) => {
    return `${ELdkStorage.key}${accountName}${ldkDataKey}`;
};
export const getAllStorageKeys = (accountName = '') => __awaiter(void 0, void 0, void 0, function* () {
    const storageKeys = {
        [ELdkData.channelManager]: '',
        [ELdkData.channelData]: '',
        [ELdkData.peers]: '',
        [ELdkData.networkGraph]: '',
        [ELdkData.timestamp]: '0',
    };
    yield Promise.all(Object.values(ELdkData).map((ldkDataKey) => {
        const storageKey = getLdkStorageKey(accountName, ldkDataKey);
        storageKeys[ldkDataKey] = storageKey;
    }));
    return storageKeys;
});
export const parseData = (data, fallback) => {
    try {
        return data ? JSON.parse(data) : fallback;
    }
    catch (_a) {
        return fallback;
    }
};
//# sourceMappingURL=helpers.js.map