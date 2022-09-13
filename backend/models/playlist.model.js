const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    /* owner: { type: String, ref: "user", required: true }, */
    name: { type: String, required: true },
    description: { type: String },
    songs: { type: Array, default: [] },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
