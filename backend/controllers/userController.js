let User = require("../models/user.model");

// @desc Get goals
// @route GET /users
// @access Private
const getUsers = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

// @desc Get an account
// @route POST /users
// @access Public
const createUser = async (req, res) => {
  if (!req.body.input) {
    res.status(400);
    throw new Error("Input is required!");
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(403)
      .send({ message: "Email already exists! Try another email." });
  }

  let newUser = await new User({ ...req.body }).save();
  res
    .status(200)
    .send({ data: newUser, message: "Account created successfully" });
};

// @desc Update account info
// @route PUT /users/:id
// @access Private
const updateUser = async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
};

// @desc Delete an account
// @route Delete /users/:id
// @access Private
const deleteUser = async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
