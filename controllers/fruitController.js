const Fruit = require("../models/fruit.js");
const express = require("express");
const router = express.Router(); // allows us to attach all routes in one group

// I.N.D.U.C.E.S

// Index - GET /fruits - render all the fruits
router.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits });
});

// New - GET /fruits/new - render the new fruits form
router.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// Delete - Delete /fruits/:fruitId - delete a specific fruit from the DB

router.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

// Update - PUT /fruits/:fruitId - update a specific fruit using req.body

router.put("/fruits/:fruitId", async (req, res) => {
  console.log(req.body);

  req.body.isReadyToEat = req.body.isReadyToEat === "on" ? true : false;

  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

  res.redirect(`/fruits/${req.params.fruitId}`);
});

// Create - POST /fruits - use the req.body to create a new fruit
router.post("/fruits", async (req, res) => {
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

router.get("/fruits/:fruitId/edit", async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", { fruit });
});

// Show - GET /fruit/:fruitId - render a specific fruit from the DB
router.get("/fruits/:fruitId", async (req, res) => {
  const fruit = await Fruit.findOne({ _id: req.params.fruitId });
  res.render("fruits/show.ejs", { fruit });
});

module.exports = router;
