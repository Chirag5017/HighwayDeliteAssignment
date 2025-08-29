import mongoose, { Document, Schema } from "mongoose";

export interface userInterface extends Document {
  name: string;
  email: string;
  password: string;
  allNotes?: mongoose.Types.ObjectId;
}

const userSchema: Schema<userInterface> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    allNotes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
        }
    ],
  },
  {
    timestamps: true,
  }
);


export const User = mongoose.model<userInterface>("User", userSchema);
