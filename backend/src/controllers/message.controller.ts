import express from "express";
import Image from "../models/image";
import User from "../models/user";
import Workshop from "../models/workshop";

export class MessageController {
  sendMessage = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({ username: req.body.from }, "messages");

    const datetime = Date.now();

    const userFrom = await User.findOne(
      { username: req.body.from },
      "messages"
    );
    const userTo = await User.findOne({ username: req.body.to }, "messages");

    const indexFrom = userFrom.messages.findIndex((chat) => {
      return chat.username == req.body.to && chat.workshop == req.body.workshop;
    });
    const indexTo = userTo.messages.findIndex(
      (chat) =>
        chat.username == req.body.from && chat.workshop == req.body.workshop
    );
    userFrom.messages[indexFrom].messages.push({
      content: req.body.content,
      direction: "sent",
      datetime,
    });

    userTo.messages[indexTo].messages.push({
      content: req.body.content,
      direction: "received",
      datetime,
    });

    await userFrom.save();
    await userTo.save();

    // await User.updateOne(
    //   {
    //     username: req.body.from,
    //     "messages.username": req.body.to,
    //     "messages.workshop": req.body.workshop,
    //   },
    //   {
    //     $push: {
    //       "messages.messages": {
    //         content: req.body.content,
    //         datetime,
    //         direction: "sent",
    //       },
    //     },
    //   }
    // );
    // await User.updateOne(
    //   {
    //     username: req.body.to,
    //     "messages.username": req.body.fron,
    //     "messages.workshop": req.body.workshop,
    //   },
    //   {
    //     $push: {
    //       "messages.messages": {
    //         content: req.body.content,
    //         datetime,
    //         direction: "received",
    //       },
    //     },
    //   }
    // );

    res.json({ status: "ok", datetime });
  };

  getChat = async (req: express.Request, res: express.Response) => {
    let chats = await User.findOne(
      {
        username: req.query.from,
        "messages.workshop": req.query.workshop,
        "messages.username": req.query.to,
      },
      "messages"
    );

    if (chats == null) {
      await User.updateOne(
        { username: req.query.from },
        {
          $push: {
            messages: {
              username: req.query.to,
              workshop: req.query.workshop,
            },
          },
        }
      );
      await User.updateOne(
        { username: req.query.to },
        {
          $push: {
            messages: {
              username: req.query.from,
              workshop: req.query.workshop,
            },
          },
        }
      );
    }

    chats = await User.findOne(
      {
        username: req.query.from,
        "messages.workshop": req.query.workshop,
        "messages.username": req.query.to,
      },
      "messages"
    );

    const chat = chats.messages.find(
      (c) => c.workshop == req.query.workshop && c.username == req.query.to
    );

    const userFrom = await User.findOne(
      { username: req.query.from },
      "image_path"
    );
    const userTo = await User.findOne({ username: req.query.to }, "image_path");
    const imageFrom = await Image.findOne(
      { image_path: userFrom.image_path },
      "content"
    );
    const imageTo = await Image.findOne(
      { image_path: userTo.image_path },
      "content"
    );

    const workshop = await Workshop.findById(req.query.workshop, "name");

    res.json({
      status: "ok",
      chat: chat.messages,
      imageFrom: imageFrom.content,
      imageTo: imageTo.content,
      workshopName: workshop.name,
    });
  };

  getUserChats = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne(
      { username: req.query.username },
      "messages"
    );
    let chats = [];
    for (let i = 0; i < user.messages.length; i++) {
      const user2 = await User.findOne(
        { username: user.messages[i].username },
        "image_path"
      );
      const image = await Image.findOne(
        { image_path: user2.image_path },
        "content"
      );
      const workshop = await Workshop.findById(
        user.messages[i].workshop,
        "name"
      );

      chats.push({
        username: user.messages[i].username,
        workshop: workshop.name,
        workshopId: user.messages[i].workshop,
        image: image.content,
      });
    }
    res.json({ status: "ok", chats });
  };

  getWorkshopChats = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne(
      { username: req.query.username },
      "messages"
    );

    const messages = user.messages.filter(
      (m) => m.workshop == req.query.workshop
    );
    let chats = [];

    for (let i = 0; i < messages.length; i++) {
      const user2 = await User.findOne(
        { username: messages[i].username },
        "image_path"
      );
      const image = await Image.findOne(
        { image_path: user2.image_path },
        "content"
      );
      chats.push({ username: messages[i].username, image: image.content });
    }
    res.json({ status: "ok", chats });
  };
}
