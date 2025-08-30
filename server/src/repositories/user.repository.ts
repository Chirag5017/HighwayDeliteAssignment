import { User, userInterface, userPartialInterface } from "../models/user.model";

export class UserRepository {
    
    async findByEmail(email : string) : Promise<userInterface | null> {
        return await User.findOne({ email })
    }

    async save(user : userPartialInterface) : Promise<userInterface> {
        const newUser = new User(user);
        return await newUser.save();
    }

    async findById(_id : string) : Promise<userInterface | null> {
        return await User.findById({_id})
    }

    async getAll() : Promise<userInterface[]> {
        return await User.find();
    } 
}