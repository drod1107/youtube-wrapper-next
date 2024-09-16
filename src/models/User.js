// src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  org_name: { type: String, required: true },
  permission: { type: Boolean, default: false }, // For email permission
  public_playlist_id: { type: String }, // To store public playlist ID
  unlisted_playlist_id: { type: String }, // To store unlisted playlist ID
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
