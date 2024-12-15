const express = require("express");
const path = require("path");
const userRoute = require("./routers/user");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const { checkAuthenticationCookie } = require("./middlewares/authentication");
const blogRoute = require("./routers/blog");
const Blog = require("./models/blog");

mongoose
  .connect("mongodb://127.0.0.1:27017/Blogify")
  .then(console.log("MongoDb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.resolve("./Public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkAuthenticationCookie("token"));

app.use("/blogs", blogRoute);
app.use("/users", userRoute);
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}); //.sort("createdAt", -1);
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(port, () => console.log(`Connection active at port: ${port}`));
