import express from "express";
import Image from "../models/image";
import Workshop from "../models/workshop";

export class WorkshopController {
  addNewWorkshop = async (req: express.Request, res: express.Response) => {
    const imageName = Object.keys(req.body.image)[0];
    const galleryNames = Object.keys(req.body.gallery);
    const datetime = Date.now();
    let image = "";
    let gallery = [];
    if (req.body.image[imageName] != "imported") {
      image = `${imageName}_${datetime}`;
      await new Image({
        path: `${imageName}_${datetime}`,
        content: req.body.image[imageName],
      }).save();
    } else {
      image = imageName;
    }
    galleryNames.forEach(async (name) => {
      if (req.body.gallery[name] != "imported") {
        gallery.push({image_path: `${name}_${datetime}`});
        await new Image({
          path: `${name}_${datetime}`,
          content: req.body.gallery[name],
        }).save();
      } else {
        gallery.push({ image_path: name });
      }
    });
    await new Workshop({
      name: req.body.name,
      datetime: req.body.datetime,
      place: req.body.place,
      location: {
        latitude: req.body.location.latitude,
        longitude: req.body.location.longitude,
      },
      short_description: req.body.shortDescription,
      long_description: req.body.longDescription,
      capacity: {
        free: req.body.capacity,
        reserved: 0,
      },
      status: "pending",
      organizer: req.body.organizer,
      image_path: image,
      gallery_path: gallery,
    }).save();
    res.json({ status: "ok" });
  };

  getCurrentWorkshops = (req: express.Request, res: express.Response) => {};

  getTopWorkshops = (req: express.Request, res: express.Response) => {};

  getWorkshop = (req: express.Request, res: express.Response) => {};

  applyToWorkshop = (req: express.Request, res: express.Response) => {};

  subscribeToWorkshop = (req: express.Request, res: express.Response) => {};

  acceptApplication = (req: express.Request, res: express.Response) => {};

  declineApplication = (req: express.Request, res: express.Response) => {};

  editInfo = (req: express.Request, res: express.Response) => {};

  cancelWorkshop = (req: express.Request, res: express.Response) => {};
}
