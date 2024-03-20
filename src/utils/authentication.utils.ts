import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const { JWT_ACCESS_TOKEN_SECRET } = process.env;
export default class AuthenticationUtils {
    constructor() {}

    generateJwtToken(payload: any): string {
        return jwt.sign(payload, `${JWT_ACCESS_TOKEN_SECRET}`);
    }
}