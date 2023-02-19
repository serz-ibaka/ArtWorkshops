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

userRouter
  .route("/check-attended")
  .get((req, res) => new UserController().checkAttended(req, res));

userRouter
  .route("/cancel-application")
  .post((req, res) => new UserController().cancelApplication(req, res));

userRouter
  .route("/update-user")
  .post((req, res) => new UserController().updateUser(req, res));

userRouter
  .route("/update-password")
  .post((req, res) => new UserController().updatePassword(req, res));

userRouter
  .route("/update-image")
  .post((req, res) => new UserController().updateImage(req, res));

userRouter
  .route("/check-token")
  .get((req, res) => new UserController().checkToken(req, res));

userRouter
  .route("/forgot-password")
  .post((req, res) => new UserController().forgotPassword(req, res));

userRouter
  .route("/set-new-password")
  .post((req, res) => new UserController().setNewPassword(req, res));

export default userRouter;
