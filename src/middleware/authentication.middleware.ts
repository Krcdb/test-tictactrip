import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from "express";

dotenv.config();

const { JWT_ACCESS_TOKEN_SECRET } = process.env;


export default class AuthenticationMiddeware {
    constructor() {}

    verifyJwt(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.status(401).send('no token found');
        }
        jwt.verify(token, `${JWT_ACCESS_TOKEN_SECRET}`, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).send(`token verification : ${err}`);
            }
            next();
        })
    }
}