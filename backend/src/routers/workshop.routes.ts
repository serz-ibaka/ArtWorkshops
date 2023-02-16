import express from "express";
import { WorkshopController } from "../controllers/workshop.controller";

const workshopRouter = express.Router();

workshopRouter
  .route("/add-new-workshop")
  .post((req, res) => new WorkshopController().addNewWorkshop(req, res));

workshopRouter
  .route("/get-current-workshops")
  .get((req, res) => new WorkshopController().getCurrentWorkshops(req, res));

workshopRouter
  .route("/get-top-workshops")
  .get((req, res) => new WorkshopController().getTopWorkshops(req, res));

workshopRouter
  .route("/get-workshop/:id")
  .get((req, res) => new WorkshopController().getWorkshop(req, res));

workshopRouter
  .route("/apply-to-workshop")
  .post((req, res) => new WorkshopController().applyToWorkshop(req, res));

workshopRouter
  .route("/subscribe-to-workshop")
  .post((req, res) => new WorkshopController().subscribeToWorkshop(req, res));

workshopRouter
  .route("/accept-application")
  .post((req, res) => new WorkshopController().acceptApplication(req, res));

workshopRouter
  .route("/decline-application")
  .post((req, res) => new WorkshopController().declineApplication(req, res));

workshopRouter
  .route("/edit-info")
  .post((req, res) => new WorkshopController().editInfo(req, res));

workshopRouter
  .route("/cancel-workshop")
  .post((req, res) => new WorkshopController().cancelWorkshop(req, res));

export default workshopRouter;
