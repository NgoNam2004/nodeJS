import express from "express";
import productmodel from "../models/product.js";
import Joi from "joi";
const router = express.Router();
const checkValidate = Joi.object({
  name: Joi.string().required().empty().messages({
    "any.required": "Name is required",
    "string.required": "Name is required",
  }),
  image: Joi.string().required().empty().messages({
    "any.required": "anh is required",
    "string.required": "anh is required",
  }),
  price: Joi.number().required().min(500).messages({
    "any.required": "price is required",
    "number.min": "price is required",
  }),
});
router.post(
  "/products",
  (req, res, next) => {
    const body = req.body;
    const { error } = checkValidate.validate({
      name: body.name,
      image: body.image,
      price: body.price,
    });
    if (error) {
      res.send({ error: error.message });
    } else {
      next();
    }
  },
  async (req, res) => {
    const product = new productmodel(req.body);
    const response = await product.save();
    res.send(response);
  }
);
router.get("/products", async (req, res) => {
  const response = await productmodel.find();
  res.send(response);
});

router.put("/products/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const response = await productmodel.findByIdAndUpdate(
    { _id: id },

    body,
    { new: true }
  );
  res.send(response);
});

router.delete("/products/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const response = await productmodel.findOneAndDelete({ _id: id });
  res.send(response);
});

export default router;
