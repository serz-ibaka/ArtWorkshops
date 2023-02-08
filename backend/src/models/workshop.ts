import mongoose from "mongoose";

var Workshop = new mongoose.Schema({
  name: { type: String },
  datetime: { type: Date },
  place: { type: String },
  location: {
    latitude: { type: String },
    longitude: { type: String },
  },
  short_description: { type: String },
  long_description: { type: String },
  capacity: {
    free: { type: Number },
    reserved: { type: Number },
  },
  status: { type: String },
  image_path: { type: String },
  gallery_path: [{ image_path: { type: String } }],
  subscribed: [
    {
      email: {
        type: String,
      },
    },
  ],
  comments: [
    {
      content: { type: String },
      datetime: { type: Date },
      username: { type: String },
      image_path: { type: String },
    },
  ],
  likes: [
    {
      username: { type: String },
      datetime: { type: Date },
    },
  ],
  organizer: {
    username: { type: String },
    firstname: { type: String },
    lastname: { type: String },
  },
  applications: [
    {
      username: { type: String },
      firstname: { type: String },
      lastname: { type: String },
      email: { type: String },
      datetime: { type: Date },
      status: { type: String },
    },
  ],
});

export default mongoose.model("Workshop", Workshop, "workshops");
