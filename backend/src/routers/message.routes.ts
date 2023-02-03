import express from "express";
import { MessageController } from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter
  .route("/send-message")
  .post((req, res) => new MessageController().sendMessage(req, res));

export default messageRouter;
