import { Response } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { userInterface } from "../models/user.model";
import { ENV } from "../config/env";

interface cookieInterface {
  httpOnly: boolean,
  sameSite: "strict",
  secure: boolean,
  maxAge: number,
}

export const setCookie : cookieInterface = {
  httpOnly: true,
  sameSite: "strict",
  secure: false,
  maxAge: 24 * 60 * 60 * 1000,
}

export class GenerateToken {

    
    generateToken(res : Response, user : userInterface, message : string) {
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(
            payload,
            ENV.TOKEN_SECRET as Secret, 
            { expiresIn : ENV.TOKEN_EXPIRY } as SignOptions
        );

        return res
        .status(200)
        .cookie("token", token, setCookie)
        .json({
            success : true,
            message,
            user
        })
    }
}