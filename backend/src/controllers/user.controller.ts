import express from "express";
import User from "../models/user";

export class UserController {
  getUsernames = (req: express.Request, res: express.Response) => {
    User.find({}, { username: 1 }, (_, usernames) => {
      res.status(200).json({ usernames: usernames });
    });
  };

  getUser = (req: express.Request, res: express.Response) => {};

  getActions = (req: express.Request, res: express.Response) => {};

  getMessages = (req: express.Request, res: express.Response) => {};

  getAppliedWorkshops = (req: express.Request, res: express.Response) => {};
}
