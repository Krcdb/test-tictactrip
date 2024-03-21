import { isNumberObject } from "util/types";
import DailyWordLimitExceededError from "../errors/dailyWordLimitExceeded.error";
import JustifyService from "../services/justify.service";
import { Request, Response } from "express";
import NoUserFoundError from "../errors/noUserFound.error";
import NoTokenFoundError from "../errors/noTokenFound.error";
import WordTooLongError from "../errors/wordTooLong.error";


export default class JustifyController {

    private justifyService: JustifyService;

    constructor() {
        this.justifyService = new JustifyService();
    }
    
    /**
    * Handles the request to justify text using the provided token.
    */
    justifyText = async (req: Request, res: Response) => {
        try {
            const text = req.body;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) {
                throw new NoTokenFoundError("no token found")
            } else {
                const justifiedText = await this.justifyService.justifyText(token, text)
                return res.status(200).send(justifiedText);
            }
        } catch (err) {
            if (err instanceof NoTokenFoundError) {
                console.log(`${err.name} : ${err.message}`);
                return res.status(401).json({Err: err.message});
            } 
            else if (err instanceof DailyWordLimitExceededError) {
                console.log(`${err.name} : ${err.message}`);
                return res.status(402).json({Err: err.message});
            }
            else if (err instanceof NoUserFoundError) {
                console.log(`${err.name} : ${err.message}`);
                return res.status(204).json({Err: err.message});
            }
            else if (err instanceof WordTooLongError) {
                console.log(`${err.name} : ${err.message}`);
                return res.status(400).json({Err: err.message});
            }
            else {
                if (err instanceof Error)
                    console.log(err.message)
                return res.status(500).json({ Error: "Error while justifying text" });
            }
        }
    }
    
}
