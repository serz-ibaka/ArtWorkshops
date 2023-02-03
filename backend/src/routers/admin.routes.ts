import express from "express";

const adminRouter = express.Router();

adminRouter.route("/admin-login").post();

adminRouter.route("/accept-user").post();

adminRouter.route("/reject-user").post();

adminRouter.route("/add-user").post();

adminRouter.route("/promote-user").post();

adminRouter.route("/accept-workshop").post();

adminRouter.route("/reject-workshop").post();

adminRouter.route("/edit-workshop").post();

adminRouter.route("/get-all-users").get();

export default adminRouter;
