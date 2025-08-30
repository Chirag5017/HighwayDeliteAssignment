import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport"; 
import { ENV } from "../config/env";

export class SendMail {
    async sendEmail(email: string, subject: string, message: string) {
        try {
            let transporter = nodemailer.createTransport(
                {
                    host: ENV.SMTP_HOST,
                    port: ENV.SMTP_PORT,
                    secure: true,
                    auth: {
                        user: ENV.SMTP_USERNAME,
                        pass: ENV.SMTP_PASSWORD,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                    connectionTimeout: 5000,
                    socketTimeout: 5000,
                } as SMTPTransport.Options
            );

            await transporter.sendMail({
                from: ENV.SMTP_FROM_EMAIL,
                to: email,
                subject: subject,
                html: message,
            });
        } catch (error: any) {
            console.log(`Error sending email : ${error}`);
            throw new Error("Could not send Email, please try again later...");
        }
    }
}
