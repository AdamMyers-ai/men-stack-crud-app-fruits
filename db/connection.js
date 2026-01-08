const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

mongoose.connection.on("error", () => {
  console.log("MongoDB had an error connecting", error);
});
