import mongoose, { Document, Schema } from "mongoose";

export interface userInterface extends Document {
  name: string,
  email: string,
  dob: string,
  allNotes?: mongoose.Types.ObjectId[],
}

export interface userPartialInterface {
  name: string,
  email: string,
  dob: string,
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
    dob: {
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
