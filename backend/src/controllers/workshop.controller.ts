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
        gallery.push({ image_path: `${name}_${datetime}` });
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

  getCurrentWorkshops = async (req: express.Request, res: express.Response) => {
    let workshops = await Workshop.find(
      { $and: [{ datetime: { $gt: Date.now() } }, { status: "active" }] },
      "name short_description datetime image_path place capacity organizer"
    );
    let images = [];
    for (let i = 0; i < workshops.length; i++) {
      const image = await Image.findOne({ path: workshops[i].image_path });
      images.push(image.content);
    }
    res.json({ workshops, images });
  };

  getTopWorkshops = (req: express.Request, res: express.Response) => {};

  getWorkshop = async (req: express.Request, res: express.Response) => {
    const workshop = await Workshop.findOne(
      { _id: req.params.id },
      "name datetime place location short_description long_description capacity image_path gallery_path"
    );
    if (workshop == null) {
      res.json({ status: "error" });
    } else {
      const image = (await Image.findOne({ path: workshop.image_path }))
        .content;
      const gallery = [];
      for (let i = 0; i < workshop.gallery_path.length; i++) {
        const img = await Image.findOne({
          path: workshop.gallery_path[i].image_path,
        });
        gallery.push(img.content);
      }

      res.json({ status: "ok", workshop: workshop, image, gallery });
    }
  };

  applyToWorkshop = (req: express.Request, res: express.Response) => {};

  subscribeToWorkshop = (req: express.Request, res: express.Response) => {};

  acceptApplication = (req: express.Request, res: express.Response) => {};

  declineApplication = (req: express.Request, res: express.Response) => {};

  editInfo = (req: express.Request, res: express.Response) => {};

  cancelWorkshop = (req: express.Request, res: express.Response) => {};
}
