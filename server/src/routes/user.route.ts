import { Router } from "express";

import { UserService } from "../services/user.services";
import { generateToken, sendOtpEmail, userRepo } from "../app";
import { UserController } from "../controllers/user.controller";

const userService = new UserService(userRepo, generateToken, sendOtpEmail);
const controller = new UserController(userService);

const router = Router();

router.route("/signup").post(controller.signup);
router.route("/signin").post(controller.signin);
router.route("/sign-up/send-otp").post(controller.sentOtpToUserForSignUp);
router.route("/sign-in/send-otp").post(controller.sentOtpToUserForSignIn);

export default router;
