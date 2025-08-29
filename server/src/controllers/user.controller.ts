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
}