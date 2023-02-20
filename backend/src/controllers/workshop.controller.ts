import express from "express";
import Image from "../models/image";
import Workshop from "../models/workshop";
import User from "../models/user";

import * as nodemailer from "nodemailer";

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

    const user = await User.findOne({ username: req.body.organizer }, "type");

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
      status: user.type != "participant" ? "pending" : "pending-update",
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
      "name datetime place location short_description long_description capacity organizer image_path gallery_path applications"
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

  applyToWorkshop = async (req: express.Request, res: express.Response) => {
    const date = Date.now();
    const user = await User.findOne(
      { username: req.body.username },
      "username firstname lastname email"
    );
    await Workshop.updateOne(
      { _id: req.body.workshop },
      {
        $push: {
          applications: {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            datetime: date,
            status: "pending",
          },
        },
      }
    );

    const workshop = await Workshop.findById(
      req.body.workshop,
      "name datetime place"
    );
    await User.updateOne(
      { username: req.body.username },
      {
        $push: {
          participantWorkshops: {
            name: workshop.name,
            datetime: workshop.datetime,
            place: workshop.place,
            id: workshop._id,
          },
        },
      }
    );
    res.json({ status: "ok" });
  };

  subscribeToWorkshop = async (req: express.Request, res: express.Response) => {
    const user = await User.findOne({ username: req.body.username }, "email");
    await Workshop.updateOne(
      { _id: req.body.workshop },
      { $push: { subscribed: { email: user.email } } }
    );
    res.json({ status: "ok" });
  };

  acceptApplication = async (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const id = req.body.workshop;
    const workshop = await Workshop.findOneAndUpdate(
      { _id: id, "applications.username": username },
      { $set: { "applications.$.status": "accepted" } }
    );
    await Workshop.findOneAndUpdate(
      { _id: id },
      { $inc: { "capacity.free": -1 } }
    );
    await Workshop.findOneAndUpdate(
      { _id: id },
      { $inc: { "capacity.reserved": 1 } }
    );

    await User.updateOne(
      { username: username },
      {
        $push: {
          participantWorkshops: {
            name: workshop.name,
            place: workshop.place,
            datetime: workshop.datetime,
            id: id,
          },
        },
      }
    );
    res.json({ status: "ok" });
  };

  declineApplication = async (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const id = req.body.workshop;
    await Workshop.findOneAndUpdate(
      { _id: id, "applications.username": username },
      { $set: { "applications.$.status": "rejected" } }
    );
    res.json({ status: "ok" });
  };

  editInfo = (req: express.Request, res: express.Response) => {};

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sergejprosic8@gmail.com",
      pass: "sbopgirjkyklytmi",
    },
  });

  cancelWorkshop = async (req: express.Request, res: express.Response) => {
    const workshop = await Workshop.findByIdAndUpdate(req.body.workshop, {
      status: "cancelled",
    });
    workshop.applications.forEach((a) => {
      const message = {
        from: "sergejprosic8@gmail.com",
        to: a.email,
        subject: "Workshop cancellation",
        html: `<p>Workshop ${workshop.name} is cancelled</p>`,
      };
      this.transporter.sendMail(message, (error, info) => {});
    });
    res.json({ status: "ok" });
  };

  getComments = async (req: express.Request, res: express.Response) => {
    const id = req.query.workshop;
    let comments = (await Workshop.findById(id, "comments")).comments;
    let allComments = [];
    for (let i = 0; i < comments.length; i++) {
      const username = comments[i].username;
      const image_path = (await User.findOne({ username }, "image_path"))
        .image_path;
      const image = (await Image.findOne({ image_path: image_path })).content;
      allComments.push({
        content: comments[i].content,
        datetime: comments[i].datetime,
        username: username,
        image: image,
      });
    }

    return res.json({ status: "ok", comments: allComments });
  };
}
