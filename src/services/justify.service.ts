import DailyWordLimitExceededError from "../errors/dailyWordLimitExceeded.error";
import NoUserFoundError from "../errors/noUserFound.error";
import { User } from "../models/user";
import Justify from "../utils/justify"


export default class JustifyService {

    private justify: Justify;

    constructor() {
        this.justify = new Justify();
    }
    
    justifyText = async(token: string, textToJustify: string): Promise<string> => {
        const numberOfWords = textToJustify.split(' ').length

        const user = await User.findOne({token: token});
        if (user == null) {
            throw new NoUserFoundError(`no user found for the token ${token}`);
        }

        const dayDate = new Date().toDateString()

        if (user.dailyLimit.date != dayDate) {
            user.dailyLimit.date = dayDate;
            user.dailyLimit.dailyWord = 0;
        }

        if (numberOfWords + user.dailyLimit.dailyWord > 80000) {
            throw new DailyWordLimitExceededError(`This text would exceed your daily word limit. words left: ${80000 - user.dailyLimit.dailyWord}`)
        }

        const justifiedText = this.justify.justifyText(textToJustify);

        user.dailyLimit.dailyWord += numberOfWords;
        user.save()
        return justifiedText
    }
}

