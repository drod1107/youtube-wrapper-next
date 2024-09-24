// src/models/User.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  org_name: { type: String, required: true },
  permission: { type: Boolean, default: false },
  public_playlist_id: { type: String },
  unlisted_playlist_id: { type: String },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);