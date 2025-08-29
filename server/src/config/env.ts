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
};
