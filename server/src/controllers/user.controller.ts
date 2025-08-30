import { Request, Response } from "express";
import { UserService } from "../services/user.services";

export class UserController {
    constructor(private userService : UserService) {}

     signup = async (req : Request, res : Response) => {
        try {
            const {name, email, dob} = req.body;
            const result = await this.userService.signUp(res, name, email, dob);
            console.log(result)
            res.status(result.success ? 201 : 400).json({result});
        } catch (error : any)  {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    };

    signin = async (req : Request, res : Response) => {
        try {
            const { email } = req.body;
            await this.userService.signIn(res, email);
        } catch (error : any) {
            res.status(400).json({ error: error.message });
        }
    }

    sentOtpToUserForSignUp = async (req : Request, res : Response) => {
        const { otp, email } = req.body;
        const subject = "OTP for Email Verification";
        const message = `Here is your otp for email verification : ${otp}`;
        try{
            const result = await this.userService.sendOtpEmailForSignUp(email, subject, message);
            if(result) {
                res.status(400).json({message : result?.message , success : false});
            }
            res.status(200).json({message : "" , success : true});
        }catch(error : any){
            res.status(400).json({ error: "Our server is down, please try again later" });
        }
    }

    sentOtpToUserForSignIn = async (req : Request, res : Response) => {
        const { otp, email } = req.body;
        const subject = "OTP for Email Verification";
        const message = `Here is your otp for email verification : ${otp}`;
        try{
            const result = await this.userService.sendOtpEmailForSignIn(email, subject, message);
            if(result) {
                res.status(400).json({message : result?.message , success : false});
            }
            res.status(200).json({message : "" , success : true});
        }catch(error : any){
            res.status(400).json({ error: "Our server is down, please try again later" });
        }
    }
}