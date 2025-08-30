import { Request, Response, Router } from "express";

import { UserService } from "../services/user.services";
import { generateToken, sendOtpEmail, userRepo } from "../app";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const userService = new UserService(userRepo, generateToken, sendOtpEmail);
const controller = new UserController(userService);
const userAuthentication = new AuthMiddleware();

const router = Router();

router.route("/sign-up").post(controller.signup);
router.route("/sign-in").post(controller.signin);
router.route("/sign-up/send-otp").post(controller.sentOtpToUserForSignUp);
router.route("/sign-in/send-otp").post(controller.sentOtpToUserForSignIn);

router.use(userAuthentication.authenticateUser);
router.get("/get", (req : Request, res : Response) => {
    res.send(req.id);
})

export default router;
