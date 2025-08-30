import express from "express";
import cors from "cors";
import { GenerateToken } from "./utils/generateToken";
import { UserRepository } from "./repositories/user.repository";
import { SendMail } from "./utils/sendEmail";

const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));

export const generateToken = new GenerateToken();
export const userRepo = new UserRepository();
export const sendOtpEmail = new SendMail(); 

import userRoute from "./routes/user.route";


app.use("/api/v1/user", userRoute )

export default app;