import express from "express";
import Image from "../models/image";
import User from "../models/user";

export class AdminController {
  adminLogin = async (req: express.Request, res: express.Response) => {
    const admin = await User.findOne({
      username: req.body.username,
      password: req.body.password,
      type: "administrator",
    });

    if (admin == null) {
      res.json({ status: "error", message: "Wrong username or password" });
    } else {
      res.json({ status: "ok" });
    }
  };

  acceptUser = async (req: express.Request, res: express.Response) => {
    await User.updateOne(
      { username: req.body.username },
      { $set: { status: "active" } }
    );
    res.json({ status: "ok" });
  };

  rejectUser = async (req: express.Request, res: express.Response) => {
    await User.updateOne(
      { username: req.body.username },
      { $set: { status: "rejected" } }
    );
    res.json({ status: "ok" });
  };

  addUser = async (req: express.Request, res: express.Response) => {
    let imagePath = `${req.body.username}_${Date.now()}`;

    await new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
      status: "active",
      type: req.body.organizer ? "organizer" : "participant",
      organization: {
        name: req.body.organizationName,
        address: {
          country: req.body.organizationCountry,
          city: req.body.organizationCity,
          zipCode: req.body.organizationZipCode,
          street: req.body.organizationStreet,
          number: req.body.organizationStreetNumber,
        },
        number: req.body.organizationNumber,
      },
      imagePath: imagePath,
    }).save();

    await new Image({
      path: imagePath,
      content: req.body.image,
    }).save();

    res.status(200).json({ status: "ok" });
  };

  updateUser = async (req: express.Request, res: express.Response) => {
    await User.updateOne({ username: req.body.username }, req.body);
    res.json({ status: "ok" });
  };

  removeUser = async (req: express.Request, res: express.Response) => {
    await User.deleteOne({ username: req.body.username });
    res.json({ status: "ok" });
  };

  promoteUser = (req: express.Request, res: express.Response) => {};

  acceptWorkshop = (req: express.Request, res: express.Response) => {};

  rejectWorkshop = (req: express.Request, res: express.Response) => {};

  editWorkshop = (req: express.Request, res: express.Response) => {};

  getAllUsers = async (req: express.Request, res: express.Response) => {
    const users = await User.find(
      { type: { $in: ["participant", "organizer"] } },
      "username firstname lastname email phone organization type status"
    );
    res.json({ status: "ok", users: users });
  };
}
