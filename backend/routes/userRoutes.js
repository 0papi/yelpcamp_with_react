const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/users");

// register user route
//  public route

router.post("/campgrounds/register", registerUser);

// Login user
// public route

router.post("/campgrounds/login", loginUser);

module.exports = router;
