const mongoose = require("mongoose");
const Campgrounds = require("../models/campgrounds");
const connectDB = require("../config/db");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

connectDB();

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campgrounds.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camps = new Campgrounds({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      author: "62af57ee8b0014266483beeb",
      image:
        "https://images.unsplash.com/photo-1518602164578-cd0074062767?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, odit laudantium rerum architecto adipisci natus delectus officiis laboriosam optio reiciendis ipsam quia, dignissimos eos at. Alias, deserunt? Rerum, cumque officia!",
      price,
    });
    await camps.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
