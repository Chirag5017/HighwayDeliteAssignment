import mongoose, { Document, Schema } from "mongoose";

export interface notesInterface extends Document {
  heading: string,
  description: string,
}

export interface notesPartialInterface {
  heading: string,
  description: string,
}

const notesSchema: Schema<notesInterface> = new mongoose.Schema(
  {
    heading : {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);


export const Notes = mongoose.model<notesInterface>("Notes", notesSchema);
