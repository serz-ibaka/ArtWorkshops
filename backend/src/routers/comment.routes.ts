import express from "express";

const commentRouter = express.Router();

commentRouter.route("/post-comment").post();

commentRouter.route("/edit-comment").post();

commentRouter.route("/delete-comment").post();

export default commentRouter;
