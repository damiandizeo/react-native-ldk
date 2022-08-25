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