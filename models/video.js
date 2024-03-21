import { number } from "joi";
import mongoose, { Schema } from "mongoose";
const videoSchema = new sChema({
  title: String,
  author: String,
  url: String,
  duration: Number,
});
const videoModel = mongoose.model("video", videoSchema);
export default videoModel;
