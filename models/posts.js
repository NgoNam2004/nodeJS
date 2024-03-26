import mongoose, { Schema } from "mongoose";
const postsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
    category: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const poststmodel = mongoose.model("post", postsSchema);
export default poststmodel;
