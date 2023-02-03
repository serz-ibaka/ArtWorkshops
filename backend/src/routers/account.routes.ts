import express from "express";

const accountRouter = express.Router();

accountRouter.route("/register").post();

accountRouter.route("/login").post();

accountRouter.route("/edit-info").post();

accountRouter.route("/forgot-password").post();

export default accountRouter;
