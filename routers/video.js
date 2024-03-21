import express from "express";
import videoModel from "../models/video";
import Joi from "joi";
const videoJoinObject = Joi.object({
  title: Joi.string().required().min(10).empty().messages({
    "any.required": "ten ko de trong",
    "string.empty": "ten ko de trong",
    "string.min": "ten >10",
  }),
  author: Joi.string().required().empty().messages({
    "any.required": "tac gia ko de trong",
    "string.empty": "tac gia ko de trong",
  }),
  url: Joi.string().required().empty().messages({
    "any.required": "url de trong",
    "string.empty": "url de trong",
  }),
  duration: Joi.number().required().min(10).empty().messages({
    "any.required": "thoi gian ko de trong",
    "number.empty": "thoi gian ko de trong",
    "number.min": "tgian qua ngan",
  }),
});
const videoRouter = express.Router();
videoRouter.post(
  "/video",
  () => {
    const body = req.body;
    const { error } = videoJoinObject.validate({
      title: body.title,
      author: body.author,
      url: body.url,
      duration: body.duration,
    });
  },
  async (req, res) => {
    try {
      const body = req.body;
      const video = new videoModel(body);
      const response = await video.save();
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
);
export default videoRouter;
