import { ELdkData, TLdkStart, TLdkStorage, TLdkStorageKeys, TStorage } from './types';
import { Result } from './result';
export declare const stringToBytes: (str: string) => Uint8Array;
export declare const bytesToString: (bytes: Uint8Array) => string;
export declare const hexStringToBytes: (hexString: string) => Uint8Array;
export declare const toCaps: (value?: string, separator?: string, split?: string) => string;
export declare const btoa: (input: string) => string;
export declare const getDefaultLdkStorageShape: (seed: string) => TLdkStorage;
export declare const startParamCheck: ({ account, genesisHash, getBestBlock, getItem, setItem, getTransactionData, network, }: TLdkStart) => Promise<Result<string>>;
export declare const setAndGetMethodCheck: ({ setItem, getItem, }: {
    getItem: TStorage;
    setItem: TStorage;
}) => Promise<Result<boolean>>;
export declare const getLdkStorageKey: (accountName: string, ldkDataKey: ELdkData) => string;
export declare const getAllStorageKeys: (accountName?: string) => Promise<TLdkStorageKeys>;
export declare const parseData: (data: string, fallback: any) => any;
