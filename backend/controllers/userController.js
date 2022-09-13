const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc Get user info
// @route GET /users
// @access Public
/* const getUserById = (req, res) => {
  User.findById()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
}; */

// @desc Create an account
// @route POST /users
// @access Public
const createUser = asyncHandler(async (req, res) => {
  /*   if (!req.body.input) {
    res.status(400);
    throw new Error("Input is required!");
  } */
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(403).send({
      message: "User with the same email already exists! Try another email.",
    });
  }

  let newUser = await new User({ ...req.body }).save();
  res
    .status(200)
    .send({ data: newUser, message: "Account created successfully" });
});

// @desc Update account info
// @route PUT /users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
});

// @desc Delete an account
// @route Delete /users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete user ${req.params.id}` });
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
