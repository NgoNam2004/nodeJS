import express from "express";
import authModel from "../models/auth.js";
import bcrypt from "bcrypt";
import Joi from "joi";
const authrouter = express.Router();
const userValidate = Joi.object({
  name: Joi.string().required().empty().messages({
    "any.required": "Name is required",
    "string.required": "Name is required",
  }),
  email: Joi.string().required().empty().messages({
    "any.required": "email is required",
    "string.required": "email is required",
  }),
  password: Joi.string().required().min(6).messages({
    "any.required": "passwords is required",
    "string.required": "passwords is required",
    "string.min": "Password >6 ky tu",
  }),
});
authrouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({ messages: errors });
    }

    // ? B2: Kiem tra email da ton tai chua?
    const checkEmail = await authModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email da ton tai!" });
    }

    // B3: Ma hoa mat khau

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // B4: Tao user moi

    const user = await authModel.create({
      ...req.body,
      password: hashPassword,
    });
    // user.password = undefined;
    return res.status(201).json({
      message: "Dang ky thanh cong!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});
export default authrouter;
