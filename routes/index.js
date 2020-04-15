const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

// ROOT
router.get("/", (req, res) => {
  res.render("landing");
});

// REGISTER USER PAGE
router.get("/register", (req, res) => {
  res.render("register", { page: "register" });
});

// REGISTER USER
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

// LOGIN USER PAGE
router.get("/login", (req, res) => {
  res.render("login", { page: "login" });
  console.log(req.header('Referer'))
});

// LOGIN USER
router.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome to YelpCamp!",
  }),
  (req, res) => {
    let lastpage = req.session.returnTo
    req.session.returnTo = "";
    res.redirect(lastpage || '/campgrounds')
  }
);

// LOGOUT USER
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "See you later!");
  res.redirect("/campgrounds");
});

module.exports = router;
