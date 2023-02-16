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
  .route("/update-user")
  .post((req, res) => new AdminController().updateUser(req, res));

adminRouter
  .route("/remove-user")
  .post((req, res) => new AdminController().removeUser(req, res));

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
  .route("/update-workshop")
  .post((req, res) => new AdminController().updateWorkshop(req, res));

adminRouter
  .route("/remove-workshop")
  .post((req, res) => new AdminController().removeWorkshop(req, res));

adminRouter
  .route("/add-workshop")
  .post((req, res) => new AdminController().addWorkshop(req, res));

adminRouter
  .route("/get-all-users")
  .get((req, res) => new AdminController().getAllUsers(req, res));

adminRouter
  .route("/get-all-workshops")
  .get((req, res) => new AdminController().getAllWorkshops(req, res));

export default adminRouter;
