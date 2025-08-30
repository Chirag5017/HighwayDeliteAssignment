import { Request, Response } from "express";
import { NoteService } from "../services/note.services";

export class NoteController {
    constructor(private noteService : NoteService) {};

    showAll = async(req: Request, res: Response) => {
        try {
            const id = req.id as string;
            const response = await this.noteService.show(id);
            if(!response) {
                res
                .status(401)
                .json({
                    success : false,
                    message : "Error showing all Notes"
                })
            }

            console.log(response);
            res.status(200)
            .json({
                message : "Here your All Notes",
                success : true,
                allNotes : response
            })
        } catch (error : any) {
            res.status(400)
            .json({message: error.message})
        }
    }

    addNote = async(req: Request, res: Response) => {
        try {
            const id = req.id as string;
            const { note } = req.body
            const response = await this.noteService.add(id, note);
            if(!response) {
                res
                .status(401)
                .json({
                    success : false,
                    message : "Error adding Note"
                })
            }

            console.log(response);
            res.status(200)
            .json({
                message : "Added complete successfully",
                success : true,
            })

        } catch (error: any) {
            res.status(400)
            .json({message: error.message})
        }
    }

    deleteNote = async(req: Request, res: Response) => {
        try {
            const id = req.id as string;
            const { noteId } = req.body
            const response = await this.noteService.delete(id, noteId);
            if(!response) {
                res
                .status(401)
                .json({
                    success : false,
                    message : "Error deleting Note"
                })
            }

            console.log(response);
            res.status(200)
            .json({
                message : "Deletion complete successfully",
                success : true,
            })

        } catch (error: any) {
              res.status(400)
            .json({message: error.message})
        }
    }
}