const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const Campgrounds = require("./models/campgrounds");
const Review = require("./models/review");

connectDB();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// define routes here
app.get("/", (req, res) => {
  res.send("This is landing page");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campgrounds.find();
  if (campgrounds) {
    res.status(200);
    res.json(campgrounds);
  } else {
    res.status(400);
    throw new Error("There are no campgrounds");
  }
});

app.post("/campgrounds/new", async (req, res) => {
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

app.get("/campgrounds/:id", async (req, res) => {
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
app.post("/campgrounds/:id/reviews", async (req, res) => {
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

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200);
  res.json(campground);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campgrounds.findByIdAndDelete(id);
  res.status(200);
  res.json(campground._id);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
