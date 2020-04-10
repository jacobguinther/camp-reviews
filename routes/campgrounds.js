const express = require("express"),
  router = express.Router(),
  Campground = require("../models/campground"),
  Comment = require("../models/comment"),
  middleware = require("../middleware"),
  {
    isLoggedIn,
    checkUserCampground,
    checkUserComment,
    isAdmin,
    isSafe,
  } = middleware;

// Define escapeRegex function for search feature
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//INDEX - show all campgrounds
router.get("/", (req, res) => {
  if (req.query.search && req.xhr) {
    console.log(req.xhr)
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    // Get all campgrounds from DB
    Campground.find({ name: regex }, (err, allCampgrounds) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(allCampgrounds);
      }
    });
  } else {
    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
      if (err) {
        console.log(err);
      } else {
        if (req.xhr) {
          res.json(allCampgrounds);
        } else {
          res.render("campgrounds/index", {
            campgrounds: allCampgrounds,
            page: "campgrounds",
          });
        }
      }
    });
  }
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn, (req, res) => {
  // get data from form and add to campgrounds array
  const { name, image, description, location, cost } = req.body;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const lat = 38.8098;
  const lng = 82.2024;
  const newCampground = {
    name: name,
    image: image,
    description: description,
    cost: cost,
    author: author,
    location: location,
    lat: lat,
    lng: lng,
  };
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
  //find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err || !foundCampground) {
        console.log(err);
        req.flash("error", "Sorry, that campground does not exist!");
        return res.redirect("/campgrounds");
      }
      //render show template with that campground
      res.render("campgrounds/show", { campground: foundCampground });
    });
});

// EDIT - shows edit form for a campground
router.get("/:id/edit", isLoggedIn, checkUserCampground, (req, res) => {
  //render edit template with that campground
  res.render("campgrounds/edit", { campground: req.campground });
});

// PUT - updates campground in the database
router.put("/:id", (req, res) => {
  const { name, image, description, location, cost } = req.body;
  const lat = 38.8098;
  const lng = 82.2024;
  const newData = {
    name: name,
    image: image,
    description: description,
    cost: cost,
    location: location,
    lat: lat,
    lng: lng,
  };
  Campground.findByIdAndUpdate(
    req.params.id,
    { $set: newData },
    (err, campground) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        req.flash("success", "Successfully Updated!");
        res.redirect("/campgrounds/" + campground._id);
      }
    }
  );
});

// DELETE - removes campground and its comments from the database
router.delete("/:id", isLoggedIn, checkUserCampground, (req, res) => {
  Comment.remove(
    {
      _id: {
        $in: req.campground.comments,
      },
    },
    (err) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/");
      } else {
        req.campground.remove((err) => {
          if (err) {
            req.flash("error", err.message);
            return res.redirect("/");
          }
          req.flash("error", "Campground deleted!");
          res.redirect("/campgrounds");
        });
      }
    }
  );
});

module.exports = router;
