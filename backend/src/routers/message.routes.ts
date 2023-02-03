import express from "express";

const messageRouter = express.Router();

messageRouter.route("/send-message").post();

export default messageRouter;
