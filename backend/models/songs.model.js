const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    song: { type: String, required: true },
    duration: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("User", playlistSchema);

module.exports = Playlist;
