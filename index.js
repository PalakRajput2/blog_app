// app.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
// Connection to MongoDB 
mongoose.connect("mongodb://localhost:27017/blogify")
  .then(() => { console.log("MongoDB connected") });

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs : allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog",blogRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
