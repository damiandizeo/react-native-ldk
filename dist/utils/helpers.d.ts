import { TLdkStart } from './types';
import { Result } from './result';
export declare const startParamCheck: ({ account, genesisHash, getBestBlock, getTransactionData, broadcastTransaction, getAddress, getScriptPubKeyHistory, network, }: TLdkStart) => Promise<Result<string>>;
export declare const parseData: (data: string, fallback: any) => any;
export declare const appendPath: (path1: string, path2: string) => string;
