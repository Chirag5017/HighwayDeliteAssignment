import { userPartialInterface } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { GenerateToken } from "../utils/generateToken";
import { Response } from "express";
import { SendMail } from "../utils/sendEmail";



export class UserService {
    constructor(private userRepo : UserRepository, 
                private genToken : GenerateToken,
                private sendMail : SendMail,
               ) {}

    async signUp(res : Response, name : string, email : string, dob : string) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists")
      //  return  res
      //       .status(400)
      //       .json({
      //           success : false,
      //           message : "User already exists"
      //       })
    }

    const newUser: userPartialInterface = {
      name,
      email,
      dob,
    };

   const user =  await this.userRepo.save(newUser);
    console.log(user);
    
    const token = this.genToken.generateToken(user)

    return {
      user : user,
      success: true,
      message: "SignUp successful",
      token : token
    };
  }

  async signIn(res : Response, email : string) {
     const user = await this.userRepo.findByEmail(email);
     if(!user) {
       throw new Error("User does not  exists")
     }

     const token = this.genToken.generateToken(user);
     return {
        user : user,
        success : true,
        message : `Welcome ${user.name}`,
        token : token
     }
  }

  async sendOtpEmailForSignUp(email : string, subject : string, message : string) {
      const user = await this.userRepo.findByEmail(email);
      if(user) {
         return {
            message : "Email already present no need to SignUp",
         }
      }
      await this.sendMail.sendEmail(email, subject, message);
  }
  
  async sendOtpEmailForSignIn(email : string, subject : string, message : string) {
      const user = await this.userRepo.findByEmail(email);
      if(!user) {
         return {
            message : "Email is not pesent need to SignUp",
         }
      }
      await this.sendMail.sendEmail(email, subject, message);
  }
}

