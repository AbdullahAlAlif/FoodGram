const mongoose = require("mongoose");
// const dotenv = require('dotenv');
// dotenv.config();
function connectDB() {
  mongoose
    .connect(process.env.Mongo_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

module.exports = connectDB;
