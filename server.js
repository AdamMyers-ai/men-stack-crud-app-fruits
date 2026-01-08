const express = require("express");
const app = express();
const Fruit = require("./models/fruit");

// Middlewares
require("./db/connection");

// allow my app to use form data (adds form data to req.body)
app.use(express.urlencoded({ extended: true }));

// Routes

// Landing Page
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// I.N.D.U.C.E.S

// Index - GET /fruits - render all the fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { allFruits });
});

// New - GET /fruits/new - render the new fruits form
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// Delete - Delete /fruits/:fruitId - delete a specific fruit from the DB

// Update - PUT /fruits/:fruitId - update a specific fruit using req.body

// Create - POST /fruits - use the req.body to create a new fruit
app.post("/fruits", async (req, res) => {
  console.log(req.body);

  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});

// Edit - GET /fruits/:fruitId - render a populated form to edit the fruit

// Show - GET /fruit/:fruitId - render a specific fruit from the DB

app.listen(3000, () => {
  console.log("Listening for fruits on port 3000");
});
