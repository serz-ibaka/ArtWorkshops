import express from "express";
import Image from "../models/image";
import User from "../models/user";
import * as nodemailer from "nodemailer";
import Token from "../models/token";

export class UserController {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sergejprosic8@gmail.com",
      pass: "sbopgirjkyklytmi",
    },
  });

  getUsernames = (req: express.Request, res: express.Response) => {
    User.find({}, { username: 1 }, (_, usernames) => {
      res.status(200).json({ usernames: usernames });
    });
  };

  getUser = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne(
      { username: req.params.username },
      "username firstname lastname phone email organization imagePath"
    );
    const image = await Image.findOne({ path: user.imagePath }, "content");
    res.json({ status: "ok", user, image });
  };

  getActions = (req: express.Request, res: express.Response) => {};

  getMessages = (req: express.Request, res: express.Response) => {};

  getAppliedWorkshops = (req: express.Request, res: express.Response) => {};

  updateUser = async (req: express.Request, res: express.Response) => {
    await User.updateOne({ username: req.body.username }, req.body);
    res.json({ status: "ok" });
  };

  updatePassword = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne(
      { username: req.body.username },
      "password"
    );
    if (user.password != req.body.oldPassword) {
      res.json({ status: "error", message: "Old password is not correct" });
    } else {
      await User.updateOne(
        { username: req.body.username },
        { password: req.body.newPassword }
      );
      res.json({ status: "ok" });
    }
  };

  updateImage = async (req: express.Request, res: express.Response) => {
    const imagePath = `${req.body.username}_${Date.now()}`;
    await User.updateOne({ username: req.body.username }, { imagePath });
    await new Image({ content: req.body.image, path: imagePath }).save();
    res.json({ status: "ok" });
  };

  forgotPassword = (req: express.Request, res: express.Response) => {
    const token = `${req.body.username}_${Date.now()}`;
    new Token({});
    const message = {
      from: "sergejprosic8@gmail.com",
      to: req.body.email,
      subject: "Recover your password",
      text: "To recover your email, access the link below. Link will be active next ",
      html: `<a href="localhost:4200/set-new-password/${token}">`,
    };

    this.transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };
}
