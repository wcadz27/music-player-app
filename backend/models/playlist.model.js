const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    username: { type: String, required: true },
    playlist_name: { type: String, required: true },
    description: { type: String, required: true },
    songs: { type: Array },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("User", playlistSchema);

module.exports = Playlist;
