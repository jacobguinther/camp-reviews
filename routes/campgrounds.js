const express = require("express"),
  router = express.Router(),

 NodeGeocoder = require('node-geocoder');

  Campground = require("../models/campground"),
  // Comment = require("../models/comment"),
  Review = require("../models/review"),
  middleware = require("../middleware"),
  { isLoggedIn, checkUserCampground, isAdmin, isSafe } = middleware;

  const options = {
    provider: 'google',
    // Optional depending on the providers
    apiKey: process.env.GOOGLE_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
  const geocoder = NodeGeocoder(options);

// Define escapeRegex function for search feature
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// CAMPGROUND INDEX ROOT
router.get("/", (req, res) => {
  // console.log("/ ROOT HIT");
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
  const searchCategory = category === "author" ? "author.username" : "name";
  let dbquery;
  if (Object.keys(req.query).length) {
    if (req.query.search.length === 0) {
      dbquery = {};
      console.log("no length");
      res.redirect("/campgrounds/page-1");
      return;
    } else {
      dbquery = { [searchCategory]: { $regex: searchTerm, $options: "i" } };
    }
  }
  Campground.find(dbquery, (err) => {
    if (err) {
      console.log(err);
    }
  })
    .skip(perPage * currentPage - perPage)
    .limit(perPage)
    .populate("reviews")
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
router.post("/", isLoggedIn, async (req, res) => {
  const { name, image, description, location, cost } = req.body;
  const { _id: id, username } = req.user;
  
  const data = await geocoder.geocode(location);
  let lat = undefined;
  let lng = undefined;
  if(data.length){
     lat = Math.round((data[0].latitude + Number.EPSILON) * 100) / 100;
     lng = Math.round((data[0].longitude + Number.EPSILON) * 100) / 100;
  }
  const author = {
    id,
    username,
  };
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
router.put("/:id", async (req, res) => {
  const { name, image, description, location, cost } = req.body;
  const data = await geocoder.geocode(location);
  let lat = undefined;
  let lng = undefined;
  if(data.length){
     lat = Math.round((data[0].latitude + Number.EPSILON) * 100) / 100;
     lng = Math.round((data[0].longitude + Number.EPSILON) * 100) / 100;
  }

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
  console.log("req.campground.reviews", req.campground.reviews);
  Review.deleteMany(
    {
      _id: {
        $in: req.campground.reviews,
      },
    },
    (err) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/");
      } else {
        req.campground.deleteOne((err) => {
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
    .populate("reviews")
    .exec((err, campground) => {
      if (err || !campground) {
        console.log(err);
        return res.redirect("/campgrounds");
      }
      let userReviewed = false;
      if (req.user !== undefined) {
        for (let i = 0; i < campground.reviews.length; i++) {
            if(campground.reviews[i].author.id.toString() === req.user._id.toString()){
            userReviewed = true;
          }
        }
        res.render("campgrounds/show", { campground, userReviewed });
      } else {
        res.render("campgrounds/show", { campground, userReviewed });
      }
    });
});

module.exports = router;
