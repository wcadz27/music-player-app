const asyncHandler = require("express-async-handler");

const Playlist = require("../models/playlist.model");
const User = require("../models/user.model");

// @desc Get all playlists
// @route GET /users
// @access Public
const getPlaylists = asyncHandler(async (req, res) => {
  const playlists = await Playlist.find({ creator: req.user.id });
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

  const newPlaylist = await Playlist.create({
    name: req.body.name,
    creator: req.user.id,
  });

  res.status(200).json(newPlaylist);
});

// @desc Update playlist info
// @route PUT /users/:id
// @access Private
const updatePlaylist = asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (!playlist) {
    res.status(400);
    throw new Error("Playlist not found");
  }

  const user = await User.findById(req.user.id);

  //Check if user is available
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check if logged in user is the playlist creator
  if (playlist.creator.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
    throw new Error("Playlist not found");
  }

  const user = await User.findById(req.user.id);

  //Check if user is available
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check if logged in user is the playlist creator
  if (playlist.creator.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
