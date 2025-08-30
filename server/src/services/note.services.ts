import { Request } from "express";
import { NoteRepository } from "../repositories/note.repository";
import { UserRepository } from "../repositories/user.repository";
import { notesPartialInterface } from "../models/notes.model";
import mongoose from "mongoose";

export class NoteService {
    constructor(private noteRepo: NoteRepository, private userRepo: UserRepository) {};

    
   async show(id: string) {
        if (!id) {
            throw new Error("User ID not found");
        }

        const user = await this.userRepo.findById(id)
        if (!user || !user.allNotes) {
            throw new Error("User or notes not found");
        }
        console.log(user.allNotes);
        return user.allNotes;
  }

  async add(id: string, note: notesPartialInterface) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        const newNote: notesPartialInterface = {
            heading: note.heading,
            description: note.description,
        };

        const savedNote = await this.noteRepo.save(newNote);
        if (!savedNote) {
            throw new Error("Error saving note");
        }

        user.allNotes?.push(savedNote._id as mongoose.Types.ObjectId);
        await user.save(); 

        return savedNote;
}

async delete(userId: string, noteId: string) {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.allNotes = user.allNotes?.filter(
        (id) => id.toString() !== noteId
        ) as mongoose.Types.ObjectId[];

        await user.save();

        const deletedNote = await this.noteRepo.deleteById(noteId);
        if (!deletedNote) {
        throw new Error("Note not found or already deleted");
        }

        return deletedNote;
}




}