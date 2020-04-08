const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");

const users = [
  { username: "jgguinther09@gmail.com", password: "password", isAdmin: false },
  { username: "toridillon@yahoo.com", password: "password", isAdmin: true },
];

const campgrounds = [
  {
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    cost: 0,
    author: "Tori",
    location: "Gallipolis, OH",
    lat: 38.8098,
    lng: 82.2024,
  },
  {
    name: "Desert Mesa",
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    cost: 0,
    author: "Tori",
    location: "Gallipolis, OH",
    lat: 38.8098,
    lng: 82.2024,
  },
  {
    name: "Canyon Floor",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    cost: 0,
    author: "Tori",
    location: "Gallipolis, OH",
    lat: 38.8098,
    lng: 82.2024,
  },
];

async function seedDB() {
    const user = await User.findOne();
    // console.log(user)

  // Delete Everything In Database
  Campground.deleteMany({}, () => {
    console.log("Removed Campgrounds!");
  })
    .then(() => {
      Comment.deleteMany({}, () => {
        console.log("Removed Comments!");
      });
    })
    .then(() => {
      User.deleteMany({}, () => {
        console.log("Removed Users!");
      });
    })
    .then(() => {
        console.log(`userfdsa: ${user.id}`)
      campgrounds.forEach((campground) => {
        const {
          name,
          image,
          description,
          cost,
          location,
          lat,
          lng,
        } = campground;
        Campground.create(
          {
            name: name,
            image: image,
            description: description,
            cost: cost,
            author: {
                id: user.id,
                username: user.username
            },
            location: location,
            lat: lat,
            lng: lng,
          },
          (err, campground) => {
            if (err) {
              console.log(err);
              return res.render("register", { error: err.message });
            }
          }
        );
      });
      console.log(`Added ${campgrounds.length} Campgrounds`);
    })
    .then(() => {
      users.forEach((user) => {
        User.register(
          { username: user.username, isAdmin: user.isAdmin },
          user.password,
          function (err, user) {
            if (err) {
              console.log(err);
              return res.render("register", { error: err.message });
            }
          }
        );
      });
      console.log(`Added ${users.length} Users`);
    })
    .catch((err) => {
      console.log(err);
    });
//   const user = await User.findOne();
//   console.log(user)

  //add a few campgrounds
  //   campgrounds.forEach(function (seed) {
  //     Campground.create(seed, function (err, campground) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("added a campground");
  //create a comment
  // Comment.create(
  //   {
  //     text: "This place is great, but I wish there was internet",
  //     author: "Homer",
  //   },
  //   function (err, comment) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       campground.comments.push(comment);
  //       campground.save();
  //       console.log("Created new comment");
  //     }
  //   }
  // );
  //
  // });
  //add a few comments
}

module.exports = seedDB;
