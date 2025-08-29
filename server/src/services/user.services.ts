import { userPartialInterface } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { GenerateToken } from "../utils/generateToken";
import { Response } from "express";



export class UserService {
    constructor(private userRepo : UserRepository, private genToken : GenerateToken) {}

    async signUp(res : Response, name : string, email : string, dob : string) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      // throw new Error("User already exists")
      return {
        success : false,
        message : "User already exists"
      }
      
    }

    const newUser: userPartialInterface = {
      name,
      email,
      dob,
    };

    await this.userRepo.save(newUser);

    return {
      success: true,
      message: "SignUp successful"
    };
  }

  async signIn(res : Response, email : string) {
     const user = await this.userRepo.findByEmail(email);
     if(!user) {
        return  res
            .status(401)
            .json({
                success : false,
                message : "Email not found"
            })
     }

     return this.genToken.generateToken(res, user, `Welcome ${user.name}`)
  }
}

