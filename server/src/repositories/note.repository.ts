import { Notes, notesInterface, notesPartialInterface } from "../models/notes.model";

export class NoteRepository {
    
    async findByEmail(email : string) : Promise<notesInterface | null> {
        return await Notes.findOne({ email })
    }

    async save(user : notesPartialInterface) : Promise<notesInterface> {
        const newUser = new Notes(user);
        return await newUser.save();
    }

    async findById(_id : string) : Promise<notesInterface | null> {
        return await Notes.findById({_id})
    }

    async getAll() : Promise<notesInterface[]> {
        return await Notes.find();
    } 

    async deleteById(_id: string): Promise<notesInterface | null> {
        return await Notes.findByIdAndDelete(_id);
    }

}