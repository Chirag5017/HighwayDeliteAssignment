import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { userRepo } from "../app";
import { validateEmail } from "../utils/validateEmail";
import { ENV } from "../config/env";

interface cookieInterface {
  httpOnly: boolean,
  secure: boolean,
  sameSite: "none" | "lax",
  maxAge: number,
  path: string
}

export const setCookie: cookieInterface = {
  httpOnly: true,
  sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
  secure: ENV.NODE_ENV === "production", // ✅ only https in prod
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  path: "/", 
};


export class UserController {
    constructor(private userService : UserService) {}

     signup = async (req : Request, res : Response) => {
        try {
            const {name, email, dob} = req.body;
            const response = await validateEmail(email);
            if(!response.success) {
                res
                .status(401)
                .json({
                    message: response.message,
                    success: response.success
                })
            }
            const result = await this.userService.signUp(res, name, email, dob);
            // console.log(result)
            res
            .status(201)
            .cookie("token", result.token, setCookie)
            .json({
                user : result.user,
                message : result.message,
                success : result.success
            })
        } catch (error : any)  {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    };

    signin = async (req : Request, res : Response) => {
        try {
            const {name, email, dob, checked} = req.body;
            const response = await validateEmail(email);
            if(!response.success) {
                res
                .status(401)
                .json({
                    message: response.message,
                    success: response.success
                })
            }
           const result = await this.userService.signIn(res, email, checked);
           res
            .status(201)
            .cookie("token", result.token, setCookie)
            .json({
                 user : result.user,
                message : result.message,
                success : result.success
            })
        } catch (error : any) {
            res.status(400).json({ error: error.message });
        }
    }

    sentOtpToUserForSignUp = async (req : Request, res : Response) => {
        const { otp, email } = req.body;
        const response = await validateEmail(email);
            if(!response.success) {
                res
                .status(401)
                .json({
                    message: response.message,
                    success: response.success
                })
            }
        const subject = "OTP for Email Verification";
        const message = `Here is your otp for email verification : ${otp}`;
        try{
            const result = await this.userService.sendOtpEmailForSignUp(email, subject, message);
            if(result) {
                res.status(400).json({message : result?.message , success : false});
            }
            res.status(200).json({message : "OTP Sent" , success : true});
        }catch(error : any){
            res.status(400).json({ error: "Our server is down, please try again later" });
        }
    }

    sentOtpToUserForSignIn = async (req : Request, res : Response) => {
        const { otp, email } = req.body;
        const response = await validateEmail(email);
            if(!response.success) {
                res
                .status(401)
                .json({
                    message: response.message,
                    success: response.success
                })
            }
        const subject = "OTP for Email Verification";
        const message = `Here is your otp for email verification : ${otp}`;
        try{
            const result = await this.userService.sendOtpEmailForSignIn(email, subject, message);
            if(result) {
                res.status(400).json({message : result?.message , success : false});
            }
            res.status(200).json({message : "OTP Sent" , success : true});
        }catch(error : any){
            res.status(400).json({ error: "Our server is down, please try again later" });
        }
    }

    dashboard = async (req : Request, res : Response) => {
        const id = req.id;
        if(!id) return res.status(401).json({
            message : "User is not Authenticated",
            success : false
        })
        const user = await userRepo.findById(id);

        if(!user) return res.status(400).json({
            message : "Invalid Details",
            success : false
        })

        return res.status(200).json({
            message : {},
            success : true,
            user
        })
    }

    logout = (req: Request, res: Response) => {
        res.clearCookie("token", {
            httpOnly: true,
            secure: ENV.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/", // ✅ cookie available for entire site
        });
        res.json({ success: true, message: "Logged out successfully" });
    }
}