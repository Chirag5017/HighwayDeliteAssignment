import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { userInterface } from "../models/user.model";
import { ENV } from "../config/env";

export class GenerateToken {

    
    generateToken(user : userInterface, checked: boolean) {
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(
            payload,
            ENV.TOKEN_SECRET as Secret, 
            { expiresIn : checked ? ENV.TOKEN_EXPIRY : "1d" } as SignOptions
        );
        
        return token;
    }
}