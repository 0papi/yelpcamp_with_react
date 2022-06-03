const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://evans:merntrial123@merncluseter.ckg8p.mongodb.net/mernapp?retryWrites=true&w=majority"
    );
    console.log(`server connected to database at ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
