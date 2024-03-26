import express from "express";
import Joi from "joi";
import poststmodel from "../models/posts.js";
const routerpost = express.Router();
const checkValidate = Joi.object({
  title: Joi.string().required().empty().messages({
    "any.required": "title is required",
    "string.required": "title is required",
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
  category: Joi.number().required().min(1).messages({
    "any.required": "category is required",
    "number.min": "category >1",
  }),
});
routerpost.post(
  "/posts",
  async (req, res, next) => {
    const body = req.body;
    const { error } = checkValidate.validate({
      title: body.title,
      description: body.description,
      image: body.image,
      author: body.author,
      category: body.category,
    });
    if (error) {
      res.send({ error: error.messages });
    } else {
      next();
    }
  },
  async (req, res) => {
    const post = new poststmodel(req.body);
    const response = await post.save();
    res.send(response);
  }
);
routerpost.get("/posts", async (req, res) => {
  try {
    const response = await poststmodel.find();
    res.send(response);
  } catch (error) {
    res.send({ error: error.message });
  }
});
routerpost.get("/posts/:id", async (req, res) => {
  try {
    const getID = await poststmodel.findById(req.params.id);
    res.send(getID);
  } catch (error) {
    res.send(error);
  }
});
routerpost.put("/posts/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const response = await poststmodel.findByIdAndUpdate(
    { _id: id },

    body,
    { new: true }
  );
  res.send(response);
});
routerpost.delete("/posts/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const response = await poststmodel.findOneAndDelete({ _id: id });
  res.send(response);
});
export default routerpost;
