import express from "express";

const userRouter = express.Router();

userRouter.route("/get-user").get();

userRouter.route("/get-actions").get();

userRouter.route("/get-messages").get();

userRouter.route("/get-applied-workshops").get();

export default userRouter;
