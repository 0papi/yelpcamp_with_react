const express = require("express");
const router = express.Router();
const Campgrounds = require("../models/campgrounds");
const Review = require("../models/review");

router.get("/", async (req, res) => {
  const campgrounds = await Campgrounds.find();
  if (campgrounds) {
    res.status(200);
    res.json(campgrounds);
  } else {
    res.status(400);
    throw new Error("There are no campgrounds");
  }
});

router.post("/new", async (req, res) => {
  const { title, price, description, image, location } = req.body;
  const campground = await Campgrounds.create({
    title: title,
    price: price,
    description: description,
    image: image,
    location: location,
  });
  res.status(200);
  res.json(campground);
});

router.get("/:id", async (req, res) => {
  const campground = await Campgrounds.findById(req.params.id).populate(
    "reviews"
  );
  if (campground) {
    res.status(200);
    res.json(campground);
  } else {
    res.status(400);
    throw new Error("Couldnt find resource with id");
  }
});
router.post("/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { rating, message } = req.body;
  const campground = await Campgrounds.findById(id);
  const review = await Review.create({
    rating: rating,
    message: message,
  });
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.json(campground);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200);
  res.json(campground);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findByIdAndDelete(id);
  res.status(200);
  res.json(campground._id);
});

router.delete("/:id/reviews/:reviewId", async (req, res) => {
  const { id, reviewId } = req.params;
  await Campgrounds.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
});

module.exports = router;
