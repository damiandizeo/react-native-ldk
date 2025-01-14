export class Ok {
    constructor(value) {
        this.value = value;
    }
    isOk() {
        return true;
    }
    isErr() {
        return false;
    }
}
export class Err {
    constructor(error, code = '') {
        this.error = error;
        this.code = code;
        if (process.env.JEST_WORKER_ID === undefined && __DEV__) {
            console.info(error);
        }
    }
    isOk() {
        return false;
    }
    isErr() {
        return true;
    }
}
export const ok = (value) => new Ok(value);
export const err = (error) => {
    if (typeof error === 'string') {
        return new Err(new Error(error), fallBackErrorCode(error));
    }
    return new Err(error, error.code || fallBackErrorCode(error.message));
};
const fallBackErrorCode = (text) => {
    if (!text) {
        return '';
    }
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};
//# sourceMappingURL=result.js.map