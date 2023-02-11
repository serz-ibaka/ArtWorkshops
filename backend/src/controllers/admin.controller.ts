import express from "express";
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

  addUser = (req: express.Request, res: express.Response) => {};

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
