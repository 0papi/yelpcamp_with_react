const asyncHandler = require("express-async-handler");
const Campgrounds = require("../models/campgrounds");
const Review = require("../models/review");

module.exports.index = asyncHandler(async (req, res) => {
  const campgrounds = await Campgrounds.find();
  if (campgrounds) {
    console.log(campgrounds);
    res.status(200);
    res.json(campgrounds);
  } else {
    res.status(400);
    throw new Error("There are no campgrounds");
  }
});

module.exports.newCampground = asyncHandler(async (req, res) => {
  const { title, price, description, image, location } = req.body;
  if (!title || !price || !description || !image || !location) {
    res.status(400);
    throw new Error("Please provide all fields");
  }
  const campground = await Campgrounds.create({
    title: title,
    price: price,
    description: description,
    author: req.user._id,
    image: image,
    location: location,
  });
  res.status(200);
  res.json(campground);
});

module.exports.singleCampground = asyncHandler(async (req, res) => {
  const campground = await Campgrounds.findById(req.params.id)
    .populate({ path: "reviews" })
    .populate({
      path: "author",
    });
  if (campground) {
    res.status(200);
    res.json(campground);
  } else {
    res.status(400);
    throw new Error("Couldnt find resource with id");
  }
});

module.exports.updateCampground = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const camp = await Campgrounds.findById(id);
  if (!camp.author.equals(req.user._id)) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const campground = await Campgrounds.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200);
  res.json(campground);
});

module.exports.createReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, message } = req.body;
  const campground = await Campgrounds.findById(id)
    .populate({ path: "reviews" })
    .populate({ path: "author" });
  const review = await Review.create({
    rating: rating,
    message: message,
    author: req.user._id,
  });
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.json(campground);
});

module.exports.deleteCampground = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const camp = await Campgrounds.findById(id);
  if (!camp.author.equals(req.user._id)) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const campground = await Campgrounds.findByIdAndDelete(id);
  res.status(200);
  res.json(campground._id);
});

module.exports.deleteCampgroundReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  // check to make sure loggedIn user matches review id
  if (!review.author.equals(req.user._id)) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Campgrounds.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  const delReview = await Review.findByIdAndDelete(reviewId);
  res.json(delReview._id);
});
