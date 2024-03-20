export default class EmailAlreadyUseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EmailAlreadyUseError";
    }
}
