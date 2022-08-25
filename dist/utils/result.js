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
    constructor(error) {
        this.error = error;
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
        return new Err(new Error(error));
    }
    return new Err(error);
};
//# sourceMappingURL=result.js.map