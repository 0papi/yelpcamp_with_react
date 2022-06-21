const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

const campRoutes = require("./routes/campRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRoutes);
app.use("/campgrounds", campRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
