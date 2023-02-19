import express from "express";

import Workshop from "../models/workshop";
import User from "../models/user";

export class LikeController {
  likeWorkshop = async (req: express.Request, res: express.Response) => {
    const date = Date.now();
    const workshop = await Workshop.findById(req.body.workshop);
    await User.updateOne(
      { username: req.body.username },
      {
        $push: {
          likes: {
            datetime: date,
            workshopName: workshop.name,
            id: workshop.id,
          },
        },
      }
    );
    await Workshop.updateOne(
      { _id: workshop._id },
      { $push: { likes: { username: req.body.username, datetime: date } } }
    );
    res.json({ status: "ok" });
  };

  unlikeWorkshop = async (req: express.Request, res: express.Response) => {
    await User.updateOne(
      { username: req.body.username },
      { $pull: { likes: { id: req.body.workshop } } }
    );
    await Workshop.updateOne(
      { _id: req.body.workshop },
      { $pull: { likes: { username: req.body.username } } }
    );
    res.json({ status: "ok" });
  };
}
