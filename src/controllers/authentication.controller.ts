import { Request, Response } from "express";
import AuthenticationService from "../services/authentication.service";


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
        } catch (error) {
            console.log(error)
            if (error instanceof Error)
                return res.status(500).json({Error: error.message});
            else 
                return res.status(500)
        }
    }
    
}
