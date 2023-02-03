import express from "express";
import { CommentController } from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter
  .route("/post-comment")
  .post((req, res) => new CommentController().postComment(req, res));

commentRouter
  .route("/edit-comment")
  .post((req, res) => new CommentController().editComment(req, res));

commentRouter
  .route("/delete-comment")
  .post((req, res) => new CommentController().deleteComment(req, res));

export default commentRouter;
