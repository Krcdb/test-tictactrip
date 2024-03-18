import JustifyService from "../services/justify.service";
import { Request, Response } from "express";


export default class JustifyController {

    private justifyService: JustifyService;

    constructor() {
        this.justifyService = new JustifyService();
    }
    
    justifyText = (req: Request, res: Response) => {
        try {
            const { token, text } = req.body;
            const justifiedText = this.justifyService.justifyText(token, text)
            return res.send(justifiedText);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ Error: err });
        }
    }
    
}
