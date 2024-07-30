const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose")
const userRoute = require("./routes/user");


// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

//Connection of MongoDB 
mongoose.connect("mongodb://localhost:27017/blogify")
.then((e)=>{console.log("Mongo DB connected")});

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user",userRoute);
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
