import { Router } from "express";

import { UserService } from "../services/user.services";
import { generateToken, userRepo } from "../app";
import { UserController } from "../controllers/user.controller";

const userService = new UserService(userRepo, generateToken);
const controller = new UserController(userService);

const router = Router();

router.route("/signup").post(controller.signup);
router.route("/signin").post(controller.signin);

export default router;
