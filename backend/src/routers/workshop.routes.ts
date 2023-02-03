import express from "express";

const workshopRouter = express.Router();

workshopRouter.route("/get-current-workshops").get();

workshopRouter.route("/get-top-workshops").get();

workshopRouter.route("/get-workshop").get();

workshopRouter.route("/apply-to-workshop").post();

workshopRouter.route("/subscribe-to-workshop").post();

workshopRouter.route("/accept-application").post();

workshopRouter.route("/decline-application").post();

workshopRouter.route("/edit-info").post();

workshopRouter.route("/cancel-workshop").post();

export default workshopRouter;
