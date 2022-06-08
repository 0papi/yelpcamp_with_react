const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const campRoutes = require("./routes/campRoutes");

connectDB();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/campgrounds", campRoutes);

// define routes here
app.get("/", (req, res) => {
  res.send("This is landing page");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
