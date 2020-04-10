const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

//root route
router.get("/", (req, res) => {
  res.render("landing");
});

// show register form
router.get("/register", (req, res) => {
  res.render("register", { page: "register" });
});

//handle sign up logic
router.post("/register", (req, res) => {
  const { username, email } = req.body;
  const newUser = new User({ username: username, email: email });
  // if(req.body.adminCode === process.env.ADMIN_CODE) {
  //   newUser.isAdmin = true;
  // }
  newUser.isAdmin = false;
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register", { error: err.message });
    }
    passport.authenticate("local")(req, res, () => {
      req.flash(
        "success",
        "Successfully Signed Up! Nice to meet you " + req.body.username
      );
      res.redirect("/campgrounds");
    });
  });
});

//show login form
router.get("/login", (req, res) => {
  res.render("login", { page: "login" });
});

//handling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome to YelpCamp!",
  }),
  (req, res) => {}
);

// logout route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "See you later!");
  res.redirect("/campgrounds");
});

module.exports = router;
