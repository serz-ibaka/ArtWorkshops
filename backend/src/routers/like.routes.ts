import express from "express";

const likeRouter = express.Router();

likeRouter.route("/like-workshop").post();

likeRouter.route("/unlike-workshop").post();

export default likeRouter;
