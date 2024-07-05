import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Author",
    },
    publishDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    // timestamps: { updatedAt: false },
    versionKey: false,
  }
);
export const Book = model("Book", schema);
