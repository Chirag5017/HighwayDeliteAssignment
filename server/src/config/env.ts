import dotenv from "dotenv";
dotenv.config();

if (!process.env.TOKEN_SECRET || !process.env.TOKEN_EXPIRY) {
  throw new Error("Missing TOKEN_SECRET or TOKEN_EXPIRY in .env file");
}

export const ENV = {
  TOKEN_SECRET: process.env.TOKEN_SECRET as string,
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRY as string,
  PORT: process.env.PORT || 5000,
  MONGO_URl: process.env.MONGO_URI as string,
  SMTP_PORT : process.env.SMTP_PORT || 465,
  SMTP_HOST : process.env.SMTP_HOST as string,
  SMTP_USERNAME : process.env.SMTP_USERNAME as string,
  SMTP_PASSWORD : process.env.SMTP_PASSWORD as string, 
  SMTP_FROM_EMAIL : process.env.SMTP_FROM_EMAIL as string,
};
