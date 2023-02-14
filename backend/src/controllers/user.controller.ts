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

  checkToken = async (req: express.Request, res: express.Response) => {
    const token = await Token.findOne({
      token: req.query.token,
      datetime: { $gte: new Date(Date.now() - 30 * 60 * 1000) },
    });
    if (token == null) {
      res.json({ status: "error", message: "Token has expired" });
    } else {
      res.json({ status: "ok", username: token.username });
    }
  };

  forgotPassword = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({ email: req.body.email });
    const timestamp = Date.now();
    const token = `${user.username}_${timestamp}`;
    await new Token({
      token: token,
      username: user.username,
      datetime: timestamp,
    }).save();
    const message = {
      from: "sergejprosic8@gmail.com",
      to: req.body.email,
      subject: "Recover your password",
      text: "To recover your email, access the link below. Link will be active next ",
      html: `<p>To set new password use <a href="http://localhost:4200/set-new-password/${token}">this link</a></p>`,
    };

    this.transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.json({ status: "ok" });
      }
    });
  };
}
