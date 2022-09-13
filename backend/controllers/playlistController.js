const asyncHandler = require("express-async-handler");

const Playlist = require("../models/playlist.model");

// @desc Get all playlists
// @route GET /users
// @access Public
const getPlaylists = asyncHandler(async (req, res) => {
  const playlists = await Playlist.find();
  res.status(200).json(playlists);
});

// @desc Create a playlist
// @route POST /users
// @access Public
const createPlaylist = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Name is required for your playlist");
  }
  /*   const user = await Playlist.findOne({ email: req.body.email });
  if (user) {
    return res.status(403).send({
      message: "User with the same email already exists! Try another email.",
    });
  } */

  let newPlaylist = await new Playlist({ ...req.body }).save();
  res.status(200).send({ data: newPlaylist, message: "New playlist created" });
});

// @desc Update playlist info
// @route PUT /users/:id
// @access Private
const updatePlaylist = asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedPlaylist);
});

// @desc Delete playlist
// @route Delete /users/:id
// @access Private
const deletePlaylist = asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await playlist.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
