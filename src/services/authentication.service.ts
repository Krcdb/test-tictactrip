import EmailAlreadyUseError from '../errors/emailAlreadyUse.error';
import { User } from '../models/user'
import AuthenticationUtils from '../utils/authentication.utils';


export default class AuthenticationService {

    private authenticationUtils: AuthenticationUtils

    constructor() {
        this.authenticationUtils = new AuthenticationUtils()
    }
    
    /**
    * Generates a JWT for a new user with the provided email and saves the user details in the database.
    */
    generateTokenAndSaveNewUser = async (userEmail: string): Promise<string> => {
        try {
            const user = await User.findOne({email: userEmail})
            if (user) {
                throw new EmailAlreadyUseError("this email is already used")
            }
            const token = this.authenticationUtils.generateJwt({email: userEmail})
            var newUser = User.build({
                email: userEmail,
                token: token,
                registered: false,
                dailyLimit: {
                    date: new Date().toDateString(),
                    dailyWord: 0
                }
            });

            await newUser.save();

            return token
        } catch (err) {
            if (err instanceof EmailAlreadyUseError) {
                throw new EmailAlreadyUseError("this email is already used")
            }
            else {
                throw Error("Error while generating token")
            }
        }
    }
}

