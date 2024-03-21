import mongoose, { Schema } from "mongoose";
const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const booktmodel = mongoose.model("books", bookSchema);
export default booktmodel;
