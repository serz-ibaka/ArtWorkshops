import mongoose from "mongoose";

var Image = new mongoose.Schema({
  path: { type: String },
  content: { type: String },
});

export default mongoose.model("Image", Image, "images");
