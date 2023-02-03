import express from "express";
import { LikeController } from "../controllers/like.controller";

const likeRouter = express.Router();

likeRouter
  .route("/like-workshop")
  .post((req, res) => new LikeController().likeWorkshop(req, res));

likeRouter
  .route("/unlike-workshop")
  .post((req, res) => new LikeController().unlikeWorkshop(req, res));

export default likeRouter;
