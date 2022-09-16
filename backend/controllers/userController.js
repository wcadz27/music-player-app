const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

// @desc Get all users
// @route GET /users
// @access Private
/* const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
}); */

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
  //Return error if new user leaves at least one of the field blank
  const { name, email, password } = req.body;
  if ((!name, !email, !password)) {
    res.status(400);
    throw new Error("All fields must be filled in");
  }

  //Find a user with the same email
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with the same email exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc Authenticate an account/login
// @route POST /users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(400);
    throw new Error("All fields must be filled in");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get owner/user data
// @route GET /users/me
// @access Private
const getMyData = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// @desc Update account info
// @route PUT /users/:id
// @access Private
/* const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
}); */

// @desc Deactivate account
// @route Delete /users/:id
// @access Private
/* const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({ id: req.params.id });
}); */

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginUser,
  createUser,
  getMyData,
};
