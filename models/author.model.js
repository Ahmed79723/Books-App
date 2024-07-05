import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: String,
    birthDate: Date,
    books: {
      type: [mongoose.Types.ObjectId],
      ref: "Book",
    },
    // email: String,
    // password: String,
    // confirmEmail: {
    //   type: Boolean,
    //   default: false,
    // },
    // role: {
    //   type: String,
    //   enum: ["admin", "user"],
    //   default: "user",
    // },
    // otp: String,
    // otpExpire: Date,
  },
  {
    // timestamps: { updatedAt: false },
    versionKey: false,
  }
);
export const Author = model("Author", schema);
