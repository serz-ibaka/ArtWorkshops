import express from "express";
import { MessageController } from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter
  .route("/send-message")
  .post((req, res) => new MessageController().sendMessage(req, res));

messageRouter
  .route("/get-chat")
  .get((req, res) => new MessageController().getChat(req, res));

messageRouter
  .route("/get-user-chats")
  .get((req, res) => new MessageController().getUserChats(req, res));

messageRouter
  .route("/get-workshop-chats")
  .get((req, res) => new MessageController().getWorkshopChats(req, res));

export default messageRouter;
