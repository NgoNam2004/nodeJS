import express from "express";
import AuthModel from "../models/auth.js";
import bcrypt from "bcryptjs";
const authrouter = express.Router();
export default authrouter;
authrouter.post("/register", async (req, res) => {
  try {
    const body = req.body;
    body.passwords = await bcrypt.hash(body.passwords, 10);
    const auth = new AuthModel(body);
    const response = await auth.save();
    res.send(response);
  } catch (error) {
    res.send({ error: error });
  }
});
