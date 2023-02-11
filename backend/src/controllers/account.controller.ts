import express from "express";
import Image from "../models/image";
import User from "../models/user";

export class AccountController {
  register = async (req: express.Request, res: express.Response) => {
    const existing = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existing == null) {
      let imagePath = `${req.body.username}_${Date.now()}`;

      await new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        organization: {
          name: req.body.organizationName,
          address: {
            country: req.body.organizationCountry,
            city: req.body.organizationCity,
            zipCode: req.body.organizationZipCode,
            street: req.body.organizationStreetNumber,
            number: req.body.organizationStreetNumber,
          },
          number: req.body.organizationNumber,
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
      res.json({ status: "error", message: "Username or email is not unique" });
    }
  };

  login = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
      type: { $ne: "administrator" },
    });

    if (user == null) {
      res.json({
        status: "error",
        message: "Username or password is incorrect",
      });
    } else if (user.status == "pending") {
      res.json({ status: "error", message: "User registration is pending" });
    } else if (user.status == "rejected") {
      res.json({ status: "error", message: "User registration is rejected" });
    } else {
      res.json({ status: "ok", username: user.username, type: user.type });
    }
  };

  editInfo = (req: express.Request, res: express.Response) => {};

  forgotPassword = (req: express.Request, res: express.Response) => {};
}
