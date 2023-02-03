import express from "express";
import { AdminController } from "../controllers/admin.controller";

const adminRouter = express.Router();

adminRouter
  .route("/admin-login")
  .post((req, res) => new AdminController().adminLogin(req, res));

adminRouter
  .route("/accept-user")
  .post((req, res) => new AdminController().acceptUser(req, res));

adminRouter
  .route("/reject-user")
  .post((req, res) => new AdminController().rejectUser(req, res));

adminRouter
  .route("/add-user")
  .post((req, res) => new AdminController().addUser(req, res));

adminRouter
  .route("/promote-user")
  .post((req, res) => new AdminController().promoteUser(req, res));

adminRouter
  .route("/accept-workshop")
  .post((req, res) => new AdminController().acceptWorkshop(req, res));

adminRouter
  .route("/reject-workshop")
  .post((req, res) => new AdminController().rejectWorkshop(req, res));

adminRouter
  .route("/edit-workshop")
  .post((req, res) => new AdminController().editWorkshop(req, res));

adminRouter
  .route("/get-all-users")
  .get((req, res) => new AdminController().getAllUsers(req, res));

export default adminRouter;
