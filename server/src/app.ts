import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { GenerateToken } from "./utils/generateToken";
import { UserRepository } from "./repositories/user.repository";
import { NoteRepository } from "./repositories/note.repository";
import { SendMail } from "./utils/sendEmail";

const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

export const generateToken = new GenerateToken();
export const userRepo = new UserRepository();
export const sendOtpEmail = new SendMail(); 
export const noteRepo = new NoteRepository();

import userRoute from "./routes/user.route";
import noteRoute from "./routes/note.route";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/note", noteRoute);

export default app;