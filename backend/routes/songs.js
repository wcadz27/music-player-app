const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songsSchema = new Schema(
  {
    position: { type: Number },
    name: { type: String, required: true },
    artist: {
      id: { type: String },
      type: String,
      required: true,
    },
    album: {
      id: { type: String },
      type: String,
    },
    time: { type: Number },
    url: {
      location: String,
      playlist: [Schema.ObjectId],
      type: String,
    },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("User", playlistSchema);

module.exports = Playlist;
