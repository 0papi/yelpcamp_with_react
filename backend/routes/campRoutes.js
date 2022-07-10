const express = require("express");
const upload = require("../upload/common");

const {
  index,
  newCampground,
  singleCampground,
  createReview,
  deleteCampground,
  deleteCampgroundReview,
  updateCampground,
} = require("../controllers/campgrounds");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", index);

router.post("/new", protect, newCampground);

router.get("/:id", singleCampground);
router.post("/:id/reviews", protect, createReview);

router.put("/:id", protect, updateCampground);

router.delete("/:id", protect, deleteCampground);

router.delete("/:id/reviews/:reviewId", protect, deleteCampgroundReview);

module.exports = router;
