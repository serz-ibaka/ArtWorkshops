import express from "express";
import { AccountController } from "../controllers/account.controller";

const accountRouter = express.Router();

accountRouter
  .route("/register")
  .post((req, res) => new AccountController().register(req, res));

accountRouter
  .route("/login")
  .post((req, res) => new AccountController().login(req, res));

accountRouter
  .route("/edit-info")
  .post((req, res) => new AccountController().editInfo(req, res));

accountRouter
  .route("/forgot-password")
  .post((req, res) => new AccountController().forgotPassword(req, res));

export default accountRouter;
