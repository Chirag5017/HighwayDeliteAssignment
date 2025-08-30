import { Response } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { userInterface } from "../models/user.model";
import { ENV } from "../config/env";

export class GenerateToken {

    
    generateToken(user : userInterface) {
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(
            payload,
            ENV.TOKEN_SECRET as Secret, 
            { expiresIn : ENV.TOKEN_EXPIRY } as SignOptions
        );
        
        return token;
    }
}