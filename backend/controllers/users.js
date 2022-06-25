const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

module.exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, password2 } = req.body;

  if (password !== password2) {
    res.status(400);
    throw new Error("Passwords do not match");
  }
  if (!username || !email || !password || !password2) {
    res.status(400);
    throw new Error("Please enter all details");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Please user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});

module.exports.loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  console.log(password, email);
  if (!password || !email) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  const user = await User.findOne({ email });
  console.log(password);
  const comparePasswords = await bcrypt.compare(password, user.password);
  console.log(comparePasswords);
  if (user && comparePasswords) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User does not exist");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
