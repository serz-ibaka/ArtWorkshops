import express from "express";
import User from "../models/user";
import Workshop from "../models/workshop";
import Image from "../models/image";

export class CommentController {
  postComment = async (req: express.Request, res: express.Response) => {
    const content = req.body.content;
    const username = req.body.username;
    const workshop = await Workshop.findById(req.body.workshop, "name");
    const datetime = Date.now();

    await User.updateOne(
      { username: username },
      {
        $push: {
          comments: {
            content,
            id: workshop._id,
            workshopName: workshop.name,
            datetime,
          },
        },
      }
    );

    const user = await User.findOne({ username }, "image_path");
    const image = await Image.findOne(
      { image_path: user.image_path },
      "content"
    );

    await Workshop.updateOne(
      { _id: workshop._id },
      { $push: { comments: { content, username, datetime } } }
    );

    res.json({ status: "ok", image: image.content, datetime });
  };

  editComment = async (req: express.Request, res: express.Response) => {
    const content = req.body.content;
    const username = req.body.username;
    const id = req.body.workshop;
    const datetime = req.body.datetime;

    const newDatetime = Date.now();

    await User.updateOne(
      { username: username, "comments.id": id, "comments.datetime": datetime },
      { "comments.$.content": content, "comments.$.datetime": newDatetime }
    );

    const p = await Workshop.findOne({
      _id: id,
      "comments.username": username,
      "comments.datetime": datetime,
    });

    await Workshop.updateOne(
      {
        _id: id,
        "comments.username": username,
        "comments.datetime": datetime,
      },
      {
        $set: {
          "comments.$.content": content,
          "comments.$.datetime": newDatetime,
        },
      }
    );

    res.json({ status: "ok" });
  };

  deleteComment = async (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const id = req.body.workshop;
    const datetime = req.body.datetime;

    await User.updateOne(
      { username },
      { $pull: { comments: { datetime, id } } }
    );

    await Workshop.updateOne(
      { _id: id },
      { $pull: { comments: { datetime, username } } }
    );
    res.json({ status: "ok" });
  };
}
