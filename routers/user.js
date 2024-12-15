const { Router } = require("express");
const router = Router();
const user = require("../models/user");

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await user.create({
    fullName,
    email,
    password,
  });

  console.log(req.body);
  return res.redirect("/");
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const User = await user.matchPasswordandCreateToken(email, password);
  if (!User.success) {
    // Log or send this message to the client
    return res.render("signin", {
      error: User.message,
    });
  } else {
    // Proceed with successful login
    //console.log("Login successful, with token:", User.token);

    return res.cookie("token", User.token).redirect("/");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
