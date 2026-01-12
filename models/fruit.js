const mongoose = require("mongoose");

// setup a schema
const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
  color: String,
});

// setup a model
const Fruit = mongoose.model("Fruit", fruitSchema);

// export this model for use in other files
module.exports = Fruit;

