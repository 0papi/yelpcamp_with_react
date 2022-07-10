const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyEmail,
} = require("../controllers/users");

// register user route
//  public route

router.post("/campgrounds/register", registerUser);

// Login user
// public route

router.post("/campgrounds/login", loginUser);
router.post("/campgrounds/verify-email", verifyEmail);

module.exports = router;
