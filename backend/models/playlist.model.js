const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    username: { type: String, ref: "user", required: true },
    title: { type: String, required: true },
    description: { type: String },
    songs: { type: Array, default: [] },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("User", playlistSchema);

module.exports = Playlist;
