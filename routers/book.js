import express from "express";
import booktmodel from "../models/book.js";
import Joi from "joi";
const routerbook = express.Router();
const checkValidate = Joi.object({
  name: Joi.string().required().empty().messages({
    "any.required": "Name is required",
    "string.required": "Name is required",
  }),

  price: Joi.number().required().min(500).messages({
    "any.required": "price is required",
    "number.min": "price is required",
  }),
  description: Joi.string().required().empty().messages({
    "any.required": "description is required",
    "string.required": "description is required",
  }),
  image: Joi.string().required().empty().messages({
    "any.required": "image is required",
    "string.required": "image is required",
  }),
  author: Joi.string().required().empty().messages({
    "any.required": "tac gia ko de trong",
    "string.empty": "tac gia ko de trong",
  }),
});
routerbook.post(
  "/books",
  async (req, res, next) => {
    const body = req.body;
    const { error } = checkValidate.validate({
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      author: body.author,
    });
    if (error) {
      res.send({ error: error.messages });
    } else {
      next();
    }
  },
  async (req, res) => {
    const book = new booktmodel(req.body);
    const response = await book.save();
    res.send(response);
  }
);
routerbook.get("/books", async (req, res) => {
  try {
    const response = await booktmodel.find();
    res.send(response);
  } catch (error) {
    res.send({ error: error.message });
  }
});
// bookRouter.get("/booking/:id", async (req, res) => {
//   try {
//     const getID = await BookModel.findById(req.params.id);
//     if (!getID) {
//       res.status(404).json({ message: "Product not found" });
//     } else {
//       res.json(getID);
//     }
//   } catch (error) {
//     console.error("Error retrieving product:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
routerbook.put("/books/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const response = await booktmodel.findByIdAndUpdate(
    { _id: id },

    body,
    { new: true }
  );
  res.send(response);
});
routerbook.delete("/books/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const response = await booktmodel.findOneAndDelete({ _id: id });
  res.send(response);
});
export default routerbook;
