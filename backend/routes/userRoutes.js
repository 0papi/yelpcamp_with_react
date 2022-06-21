const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
  "/campgrounds/register",
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
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
  })
);

// Login

router.post(
  "/campgrounds/login",
  asyncHandler(async (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
      res.status(400);
      throw new Error("Please provide all fields");
    }

    const user = await User.findOne({ email });
    const comparePasswords = await bcrypt.compare(password, user.password);
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
  })
);

router.get("/campgrounds/getMe", protect, (req, res) => {
  res.json({ message: "Hurray you were authenticated" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = router;
