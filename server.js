const express = require("express");
const app = express();
const Fruit = require("./models/fruit");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const fruitController = require("./controllers/fruitController");

// Middlewares
require("./db/connection");
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// allow my app to use form data (adds form data to req.body)
app.use(express.urlencoded({ extended: true }));

// Routes

// Landing Page
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.use(fruitController);

// route to catch any undefined urls (404)
app.get("/*splat", (req, res) => {
  res.render("404.ejs", { url: req.url });
});

app.listen(3000, () => {
  console.log("Listening for fruits on port 3000");
});
