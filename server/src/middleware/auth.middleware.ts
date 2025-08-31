import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  id: string;
  email: string;
}


export class AuthMiddleware {
  authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.token ||
        req.header("Authorization")?.replace("Bearer ", "").trim();

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Request - No token",
        });
      }

      const decodeToken = jwt.verify(token, ENV.TOKEN_SECRET) as MyJwtPayload;

      if (!decodeToken) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      req.id = decodeToken.id;
      next();
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || "Invalid Token",
      });
    }
  };
}
