import { Request, Response } from "express";
import AuthenticationService from "../services/authentication.service";
import EmailAlreadyUseError from "../errors/emailAlreadyUse.error";


export default class AuthenticationController {

    private authenticationService: AuthenticationService;

    constructor() {
        this.authenticationService = new AuthenticationService();
    }
    
    requestToken = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const token = await this.authenticationService.generateToken(email)
            return res.status(200).json({token: token});
        } catch (err) {
            if (err instanceof EmailAlreadyUseError) {
                console.log(`${err.name} : ${err.message}`);
                return res.status(409).json({Err: err.message});
            }
            else {
                if (err instanceof Error)
                    console.log(err.message)
                return res.status(500).json({ Error: "Error while requesting token" });
            }
        }
    }
    
}
