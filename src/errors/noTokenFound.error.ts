export default class NoTokenFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoTokenFoundError";
    }
}
