const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Review = require("../models/review"),
  middleware = require("../middleware"),
  { isLoggedIn, checkUserReview } = middleware;

// CREATE REVIEW PAGE
router.get("/new", isLoggedIn, (req, res) => {
  const CAMPGROUND = Campground.findById(req.params.id);
  CAMPGROUND.then((campground) => {
    res.render("comments/new", { campground: campground });
  }).catch((err) => {
    console.log("ERROR FINDING CAMPGROUND:", err);
  });
});

// CREATE REVIEW
router.post("/", isLoggedIn, (req, res) => {
  console.log("CREATE COMMENT ROUTE HIT");
  const { comment, rating } = req.body;
  const { _id: id, username } = req.user;
  let review = {};
  review.rating = rating;
  review.text = comment; // change text to comment to do so i can do object inline
  const CAMPGROUND = Campground.findById(req.params.id);
  const REVIEW = Review.create(review);
  const promiseArr = [CAMPGROUND, REVIEW];
  Promise.all(promiseArr)
    .then((values) => {
      const campground = values[0];
      const review = values[1];
      review.author.id = id;
      review.author.username = username;
      review.save();
      campground.reviews.push(review);
      campground.save();
      req.flash("success", "Created a comment!");
      res.redirect("/campgrounds/id-" + campground._id);
    })
    .catch((err) => {
      console.log("ERROR CREATING REVIEW:", err);
      req.flash("error", "Error creating comment.");
      res.redirect("/campgrounds/id-" + req.params.id);
    });
});

// UPDATE COMMENT PAGE
router.get("/:reviewId/edit", isLoggedIn, checkUserReview, (req, res) => {
  res.render("comments/edit", {
    campground_id: req.params.id,
    review: req.comment,
  });
});

// UPDATE COMMENT
router.put("/:reviewId", isLoggedIn, checkUserReview, (req, res) => {
  console.log("UPDATE COMMENT ROUTE HIT");
  let review = {};
  const { comment, rating } = req.body;
  review.rating = rating;
  review.text = comment;
  const REVIEW = Review.findByIdAndUpdate(req.params.reviewId, review);
  REVIEW.then(() => {
    res.redirect("/campgrounds/id-" + req.params.id);
  }).catch((err) => {
    console.log("ERROR UPDATING COMMENT", err);
    res.render("edit");
  });
});

// DELETE COMMENT
router.delete("/:reviewId", isLoggedIn, checkUserReview, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        reviews: req.comment.id,
      },
    },
    (err) => {
      if (err) {
        console.log("ERROR DELETING COMMENT:", err);
        req.flash("error", err.message);
        res.redirect("/");
      } else {
        req.comment.remove((err) => {
          if (err) {
            req.flash("error", err.message);
            return res.redirect("/");
          }
          req.flash("error", "Review deleted!");
          res.redirect("/campgrounds/id-" + req.params.id);
        });
      }
    }
  );
});

module.exports = router;
