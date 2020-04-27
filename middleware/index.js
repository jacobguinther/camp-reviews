const Review = require("../models/review");
const Campground = require("../models/campground");

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in to do that!");
    res.redirect("/login");
  },

  checkUserCampground: (req, res, next) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err || !foundCampground) {
        console.log(err);
        req.flash("error", "Sorry, that campground does not exist!");
        res.redirect("/campgrounds");
      } else if (
        foundCampground.author.id.equals(req.user._id) ||
        req.user.isAdmin
      ) {
        req.campground = foundCampground;
        next();
      } else {
        req.flash("error", "You don't have permission to do that!");
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
  },

  checkUserReview: (req, res, next) => {
    const reviewId = req.params.reviewId;
    Review.findById(reviewId, (err, foundReview) => {
      if (err || !foundReview) {
        console.log("ERROR FINDING REVIEW:", err);
        req.flash("error", "Sorry, that review does not exist!");
        res.redirect("/campgrounds");
      } else if (
        foundReview.author.id.equals(req.user._id) ||
        req.user.isAdmin
      ) {
        req.review = foundReview;
        next();
      } else {
        req.flash("error", "You don't have permission to do that!");
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
  },
  
  checkIfUserReviewed: (req,res,next) =>{
    Campground.findById(req.params.id)
    .populate("reviews")
    .exec((err, campground) => {
      if (err) {
        console.log(err);
        return res.redirect("/campgrounds");
      } else {
        let userReviewed = false;
        let reviewId = "";
        if (req.user !== undefined) {
          for (let i = 0; i < campground.reviews.length; i++) {
            if (
              campground.reviews[i].author.id.toString() ===
              req.user._id.toString()
            ) {
              userReviewed = true;
              reviewId = campground.reviews[i].id;
            }
          }
        }
        if(userReviewed !== true){
          req.campground = campground
          next();
        }else {
        req.flash("error", "You already have a review for this campground.");
          res.redirect(
            `/campgrounds/${req.params.id}/comments/${reviewId}/edit`)
        }
        
      }
    });
  },

  isAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      // req.flash('error', 'This site is now read only thanks to spam and trolls.');
      res.redirect("back");
    }
  },

  isSafe: (req, res, next) => {
    if (req.body.image.match(/^https:\/\/images\.unsplash\.com\/.*/)) {
      next();
    } else {
      req.flash(
        "error",
        "Only images from images.unsplash.com allowed.\nSee https://youtu.be/Bn3weNRQRDE for how to copy image urls from unsplash."
      );
      res.redirect("back");
    }
  },
};
