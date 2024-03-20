import { User } from '../models/user'
import AuthenticationUtils from '../utils/authentication.utils';


export default class AuthenticationService {

    private authenticationUtils: AuthenticationUtils

    constructor() {
        this.authenticationUtils = new AuthenticationUtils()
    }
    
    generateToken = async (userEmail: string): Promise<string> => {
        try {
            const user = await User.findOne({email: userEmail})
            if (user) {
                throw Error("this email is already used")
            }
            const token = this.authenticationUtils.generateJwtToken({email: userEmail})
            var newUser = User.build({
                email: userEmail,
                token: token,
                registered: false,
                dailyLimit: {
                    date: new Date().toDateString(),
                    dailyWord: 0
                }
            });

            newUser.save();

            return token
        } catch (error) {
            console.log(`error : ${error}`)
            throw Error("this email is already used")
        }
    }
}

