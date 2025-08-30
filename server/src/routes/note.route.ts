import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { NoteService } from "../services/note.services";
import { noteRepo, userRepo } from "../app";
import { NoteController } from "../controllers/note.controller";

const authentication = new AuthMiddleware();

const noteService = new NoteService(noteRepo, userRepo);
const controller = new NoteController(noteService);

const router = Router();

router.use(authentication.authenticateUser);
router.route("/show-all").get(controller.showAll);
router.route("/addNote").get(controller.addNote);
router.route("/deleteNote").get(controller.deleteNote);

export default router;
