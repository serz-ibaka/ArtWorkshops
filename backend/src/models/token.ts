import mongoose from "mongoose";

var Token = new mongoose.Schema({
  token: { type: String },
  username: { type: String },
  datetime: { type: Date },
});

export default mongoose.model("Token", Token, "tokens");
