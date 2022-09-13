const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    /*     name: {
      type: String,
      required: true,
    }, */
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    /*     password: { type: String, required: true },
    gender: { type: String, required: true },
    month: { type: String, required: true },
    date: { type: String, required: true },
    year: { type: String, required: true },
    likedSongs: { type: [String], default: [] },
    playlists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: true }, */
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
