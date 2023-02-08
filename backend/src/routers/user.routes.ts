import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter
  .route("/get-usernames")
  .get((req, res) => new UserController().getUsernames(req, res));

userRouter
  .route("/get-user/:username")
  .get((req, res) => new UserController().getUser(req, res));

userRouter
  .route("/get-actions/:username")
  .get((req, res) => new UserController().getActions(req, res));

userRouter
  .route("/get-messages/:username")
  .get((req, res) => new UserController().getMessages(req, res));

userRouter
  .route("/get-applied-workshops/:username")
  .get((req, res) => new UserController().getAppliedWorkshops(req, res));

export default userRouter;
