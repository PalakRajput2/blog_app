// app.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

// Connection to MongoDB 
mongoose.connect("mongodb://localhost:27017/blogify")
  .then(() => { console.log("MongoDB connected") });

app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRoute);
app.use("/blog",blogRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
