const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Review = require("../models/review"),
  middleware = require("../middleware"),
  { isLoggedIn, checkUserReview, checkIfUserReviewed } = middleware;

// CREATE REVIEW PAGE
router.get("/new", isLoggedIn,checkIfUserReviewed, (req, res) => {
  // Campground.findById(req.params.id)
  //   .populate("reviews")
  //   .exec((err, campground) => {
  //     if (err) {
  //       console.log(err);
  //       return res.redirect("/campgrounds");
  //     } else {

  //       let userReviewed = false;
  //       let reviewId = "";
  //       if (req.user !== undefined) {
  //         for (let i = 0; i < campground.reviews.length; i++) {
  //           if (
  //             campground.reviews[i].author.id.toString() ===
  //             req.user._id.toString()
  //           ) {
  //             userReviewed = true;
  //             reviewId = campground.reviews[i].id;
  //             console.log("reviewID", reviewId);
  //           }
  //         }
  //       }

  //       if(userReviewed !== true){
  //         console.log("userReviewed: ", userReviewed);
          res.render("comments/new", { campground: req.campground });
    //     }else {
    //       res.redirect(
    //         `/campgrounds/${req.params.id}/comments/${reviewId}/edit`)
    //     }

        
    //   }
    // });
});

// CREATE REVIEW
router.post("/", isLoggedIn,checkIfUserReviewed, (req, res) => {
  console.log("CREATE COMMENT ROUTE HIT");
  const { comment, rating } = req.body;
  const { _id: id, username } = req.user;
  let review = { comment, rating };
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
      res.redirect("/campgrounds/" + campground._id);
    })
    .catch((err) => {
      console.log("ERROR CREATING REVIEW:", err);
      req.flash("error", "Error creating comment.");
      res.redirect("/campgrounds/" + req.params.id);
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
  const { comment, rating } = req.body;
  let review = { comment, rating };
  const REVIEW = Review.findByIdAndUpdate(req.params.reviewId, review);
  REVIEW.then(() => {
    res.redirect("/campgrounds/" + req.params.id);
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
          res.redirect("/campgrounds/" + req.params.id);
        });
      }
    }
  );
});

module.exports = router;
