import express from "express";
import Workshop from "../models/workshop";
import Image from "../models/image";
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

  acceptUser = async (req: express.Request, res: express.Response) => {
    await User.updateOne(
      { username: req.body.username },
      { $set: { status: "active" } }
    );
    res.json({ status: "ok" });
  };

  rejectUser = async (req: express.Request, res: express.Response) => {
    await User.updateOne(
      { username: req.body.username },
      { $set: { status: "rejected" } }
    );
    res.json({ status: "ok" });
  };

  addUser = async (req: express.Request, res: express.Response) => {
    let imagePath = `${req.body.username}_${Date.now()}`;

    await new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
      status: "active",
      type: req.body.organizer ? "organizer" : "participant",
      organization: {
        name: req.body.organizationName,
        address: {
          country: req.body.organizationCountry,
          city: req.body.organizationCity,
          zipCode: req.body.organizationZipCode,
          street: req.body.organizationStreet,
          number: req.body.organizationStreetNumber,
        },
        number: req.body.organizationNumber,
      },
      imagePath: imagePath,
    }).save();

    await new Image({
      path: imagePath,
      content: req.body.image,
    }).save();

    res.status(200).json({ status: "ok" });
  };

  updateUser = async (req: express.Request, res: express.Response) => {
    await User.updateOne({ username: req.body.username }, req.body);
    res.json({ status: "ok" });
  };

  removeUser = async (req: express.Request, res: express.Response) => {
    await User.deleteOne({ username: req.body.username });
    res.json({ status: "ok" });
  };

  promoteUser = (req: express.Request, res: express.Response) => {};

  acceptWorkshop = async (req: express.Request, res: express.Response) => {
    await Workshop.updateOne({ _id: req.body._id }, { status: "active" });
    res.json({ status: "ok" });
  };

  rejectWorkshop = async (req: express.Request, res: express.Response) => {
    await Workshop.updateOne({ _id: req.body._id }, { status: "rejected" });
    res.json({ status: "ok" });
  };

  updateWorkshop = async (req: express.Request, res: express.Response) => {
    await Workshop.updateOne({ _id: req.body._id }, req.body);
    res.json({ status: "ok" });
  };

  removeWorkshop = async (req: express.Request, res: express.Response) => {
    await Workshop.deleteOne({ _id: req.body._id });
    res.json({ status: "ok" });
  };

  addWorkshop = async (req: express.Request, res: express.Response) => {
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
      gallery.push({ image_path: `${name}_${datetime}` });
      await new Image({
        path: `${name}_${datetime}`,
        content: req.body.gallery[name],
      }).save();
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
      status: "active",
      organizer: req.body.organizer,
      image_path: image,
      gallery_path: gallery,
    }).save();
    res.json({ status: "ok" });
  };

  getAllUsers = async (req: express.Request, res: express.Response) => {
    const users = await User.find(
      { type: { $in: ["participant", "organizer"] } },
      "username firstname lastname email phone organization type status"
    );
    res.json({ status: "ok", users: users });
  };

  getAllWorkshops = async (req: express.Request, res: express.Response) => {
    const workshops = await Workshop.find(
      { status: { $in: ["active", "pending"] } },
      "name datetime place location short_description long_description image_path status"
    );
    workshops.forEach(async (w) => {
      w["image"] = await Image.find({ image_path: w.image_path });
    });
    res.json({ status: "ok", workshops: workshops });
  };
}
