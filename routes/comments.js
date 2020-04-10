const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment = require("../models/comment"),
  middleware = require("../middleware"),
  { isLoggedIn, checkUserComment, isAdmin } = middleware;

//Comments New
router.get("/new", isLoggedIn, (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

//Comments Create
router.post("/", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          console.log(`comment: ${comment}`);
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("success", "Created a comment!");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

router.get("/:commentId/edit", isLoggedIn, checkUserComment, (req, res) => {
  res.render("comments/edit", {
    campground_id: req.params.id,
    comment: req.comment,
  });
});

router.put("/:commentId", isAdmin, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    req.body.comment,
    (err, comment) => {
      if (err) {
        console.log(err);
        res.render("edit");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  );
});

router.delete("/:commentId", isLoggedIn, checkUserComment, (req, res) => {
  // find campground, remove comment from comments array, delete comment in db
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
          res.redirect("/campgrounds/" + req.params.id);
        });
      }
    }
  );
});

module.exports = router;
