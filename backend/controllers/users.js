const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const VerificationToken = require("../models/verifyToken");
const { generateOTP, mailTransport } = require("../utils/mail");
const sendEmail = require("../utils/sendEmail");
const { isValidObjectId } = require("mongoose");

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
  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  const OTP = generateOTP();
  const verificationToken = new VerificationToken({
    owner: user._id,
    verifyToken: OTP,
  });

  await verificationToken.save();
  await user.save();

  await sendEmail(user.email, "Email verification token", OTP);

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

exports.verifyEmail = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp.trim()) {
    res.status(400);
    throw new Error("Invalid request, missing parameters!");
  }

  if (!isValidObjectId(userId)) {
    res.status(400);
    throw new Error("Invalid user Id");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error("Sorry, user not found");
  }

  if (user.verified) {
    res.status(400);
    throw new Error("This account is already verified");
  }

  const token = await VerificationToken.findOne({ owner: user._id });
  if (user.verified) {
    res.status(400);
    throw new Error("Sorry, user not found!");
  }

  const isMatched = await token.compareVerifyToken(otp);

  if (!isMatched) {
    res.status(400);
    throw new Error("Please provide a valid token");
  }

  user.verified = true;

  await VerificationToken.findByIdAndDelete(token._id);
  user.save();

  mailTransport().sendMail({
    from: "emailVerfication@email.com",
    to: user.email,
    subject: "Verify your email account",
    html: `<h1>Email verified successfully thank you for connecting with us</h1>`,
  });

  res.json({ success: true, message: "Your email is verified" });
});
