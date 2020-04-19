const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment = require("../models/comment"),
  Rating = require("../models/rating"),
  middleware = require("../middleware"),
  { isLoggedIn, checkUserComment, isAdmin } = middleware;

// CREATE COMMENT PAGE
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

// CREATE COMMENT
router.post("/", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      const { comment, rating } = req.body;
      const { _id: id, username } = req.user;

      const COMMENT = Comment.create(comment);
      const RATING = Rating.create(rating);
      const promiseArr = [COMMENT, RATING];
      Promise.all(promiseArr).then((values) => {
        let comment = values[0];
        let rating = values[1];
        comment.author.id = id;
        comment.author.username = username;
        comment.save();
        campground.comments.push(comment);
        rating.author.id = id;
        rating.author.username = username;
        rating.save();
        campground.ratings.push(rating);
        campground.save();
        req.flash("success", "Created a comment!");
        res.redirect("/campgrounds/id-" + campground._id);
      });
    }

  });
});

// UPDATE COMMENT PAGE
router.get("/:commentId/edit", isLoggedIn, checkUserComment, (req, res) => {
  res.render("comments/edit", {
    campground_id: req.params.id,
    comment: req.comment,
  });
});

// UPDATE COMMENT
router.put("/:commentId", isLoggedIn, checkUserComment, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    req.body.comment,
    (err, comment) => {
      if (err) {
        console.log(err);
        res.render("edit");
      } else {
        res.redirect("/campgrounds/id-" + req.params.id);
      }
    }
  );
});

// DELETE COMMENT
router.delete("/:commentId", isLoggedIn, checkUserComment, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        comments: req.comment.id,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        req.flash("error", err.message);
        res.redirect("/");
      } else {
        req.comment.remove((err) => {
          if (err) {
            req.flash("error", err.message);
            return res.redirect("/");
          }
          req.flash("error", "Comment deleted!");
          res.redirect("/campgrounds/id-" + req.params.id);
        });
      }
    }
  );
});

module.exports = router;
