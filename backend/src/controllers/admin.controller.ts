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

  acceptUser = (req: express.Request, res: express.Response) => {};

  rejectUser = (req: express.Request, res: express.Response) => {};

  addUser = (req: express.Request, res: express.Response) => {};

  promoteUser = (req: express.Request, res: express.Response) => {};

  acceptWorkshop = (req: express.Request, res: express.Response) => {};

  rejectWorkshop = (req: express.Request, res: express.Response) => {};

  editWorkshop = (req: express.Request, res: express.Response) => {};

  getAllUsers = (req: express.Request, res: express.Response) => {};
}
