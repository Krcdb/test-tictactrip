export default class DailyWordLimitExceededError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DailyWordLimitExceededError";
    }
}
