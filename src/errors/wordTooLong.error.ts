export default class WordTooLongError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WordTooLongError";
    }
}
