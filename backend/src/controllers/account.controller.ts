import express from "express";
import Image from "../models/image";
import User from "../models/user";

export class AccountController {
  register = async (req: express.Request, res: express.Response) => {
    const existing = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existing) {
      let imagePath = `${req.body.username}_${Date.now()}`;

      await new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.fistname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        organization: {
          organizationName: req.body.organizationName,
          organizationAddress: req.body.organizationAddress,
          organizationNumber: req.body.organizationNumber,
        },
        status: "pending",
        type: req.body.organizer ? "organizer" : "participant",
        imagePath: imagePath,
      }).save();

      await new Image({
        path: imagePath,
        content: req.body.image,
      }).save();

      res.status(200).json({ status: "ok" });
    } else {
      res.status(400).json({ status: "error" });
    }
  };

  login = (req: express.Request, res: express.Response) => {};

  editInfo = (req: express.Request, res: express.Response) => {};

  forgotPassword = (req: express.Request, res: express.Response) => {};
}
