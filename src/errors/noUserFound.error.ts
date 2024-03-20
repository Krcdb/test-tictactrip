export default class NoUserFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoUserFoundError";
    }
}
