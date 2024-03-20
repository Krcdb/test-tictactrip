import DailyWordLimitExceededError from "../errors/dailyWordLimitExceeded.error";
import NoUserFoundError from "../errors/noUserFound.error";
import WordTooLongError from "../errors/wordTooLong.error";
import { User } from "../models/user";
import JustifyUtils from "../utils/justify.utils"


export default class JustifyService {

    private justifyUtils: JustifyUtils;

    constructor() {
        this.justifyUtils = new JustifyUtils();
    }
    
    justifyText = async(token: string, textToJustify: string): Promise<string> => {
        const words = textToJustify.split(' ')
        const numberOfWords = words.length

        if (this.justifyUtils.checkIfTextValid(words) == false) {
            console.log("word toot long")
            throw new WordTooLongError(`a word is more than 80 char`);
        }
        console.log("pass")
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

        const justifiedText = this.justifyUtils.justifyText(textToJustify);

        user.dailyLimit.dailyWord += numberOfWords;
        user.save()
        return justifiedText
    }
}

