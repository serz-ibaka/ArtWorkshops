import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter
  .route("/get-user")
  .get((req, res) => new UserController().getUser(req, res));

userRouter
  .route("/get-actions")
  .get((req, res) => new UserController().getActions(req, res));

userRouter
  .route("/get-messages")
  .get((req, res) => new UserController().getMessages(req, res));

userRouter
  .route("/get-applied-workshops")
  .get((req, res) => new UserController().getAppliedWorkshops(req, res));

export default userRouter;
