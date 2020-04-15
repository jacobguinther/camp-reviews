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

// CAMPGROUND INDEX ROOT
router.get("/", (req, res) => {
  console.log("/ ROOT HIT");
  res.redirect("campgrounds/page-1");
});

// CAMPGROUND INDEX
router.get("/page-:page", (req, res) => {
  const perPage = 9;
  const currentPage = req.params.page || 1;

  const { search, category } = req.query;
  const searchQueryValue = search;
  const categoryQueryValue = category;
  const searchQuery = Object.keys(req.query)[0];
  const categoryQuery = Object.keys(req.query)[1];

  const searchTerm = search || "";
  const searchCategory = category === "author" ? "author.username" : category;
  let dbquery;
  if (Object.keys(req.query).length) {
    dbquery = { [searchCategory]: { $regex: searchTerm, $options: "i" } };
  } else {
    dbquery = {};
  }

  Campground.find(dbquery, (err) => {
    if(err){console.log(err)}
  })
    .skip(perPage * currentPage - perPage)
    .limit(perPage)
    .exec((err, campgrounds) => {
      Campground.countDocuments(dbquery).exec((err, count) => {
        const totalPages = Math.ceil(count / perPage) || 1;
        if (err) return next(err);
        res.render("campgrounds/index", {
          campgrounds,
          currentPage,
          totalPages,
          searchQuery,
          searchQueryValue,
          categoryQuery,
          categoryQueryValue,
        });
      });
    });
});

// CREATE CAMPGROUND PAGE
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// CREATE CAMPGROUND
router.post("/", isLoggedIn, (req, res) => {
  const { name, image, description, location, cost } = req.body;
  const { _id: id, username } = req.user;
  const author = {
    id,
    username,
  };
  const lat = 38.8098;
  const lng = 82.2024;
  const newCampground = {
    name,
    image,
    description,
    cost,
    author,
    location,
    lat,
    lng,
  };
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Created a campground!");
      res.redirect(`/campgrounds/id-${newlyCreated._id}`);
    }
  });
});

// UPDATE CAMPGROUND PAGE
router.get("/:id/edit", isLoggedIn, checkUserCampground, (req, res) => {
  res.render("campgrounds/edit", { campground: req.campground });
});

// UPDATE CAMPGROUND
router.put("/:id", (req, res) => {
  const { name, image, description, location, cost } = req.body;
  const lat = 38.8098;
  const lng = 82.2024;
  const newData = {
    name,
    image,
    description,
    cost,
    location,
    lat,
    lng,
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
        res.redirect("/campgrounds/id-" + campground._id);
      }
    }
  );
});

// DELETE CAMPGROUND
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

// SHOW CAMPGROUND
router.get("/id-:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err || !foundCampground) {
        console.log(err);
        return res.redirect("/campgrounds");
      }
      res.render("campgrounds/show", { campground: foundCampground });
    });
});

module.exports = router;
