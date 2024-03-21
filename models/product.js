import mongoose, { Schema } from "mongoose";
const productSchema = new Schema(
  {
    name: String,
    image: String,
    price: Number,
  },
  { timestamps: true }
);
const productmodel = mongoose.model("products", productSchema);
export default productmodel;
