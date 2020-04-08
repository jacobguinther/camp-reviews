const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const moment = require('moment');

async function seedDB() {
  console.clear();
  console.log(moment().format('MMMM Do YYYY, h:mm a'))
  const user = await User.findOne();
  // console.log(user);
  const jacob = await User.findOne({ username: "jgguinther09@gmail.com" });
  // console.log(jacob);
  const tori = await User.findOne({ username: "toridillon@yahoo.com" });
  // console.log(tori);

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
    .then(() => {
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
              username: user.username,
            },
            location: location,
            lat: lat,
            lng: lng,
          },
          (err, campground) => {
            if (err) {
              console.log(err);
              return res.render("register", { error: err.message });
            } else {
              // comments.forEach((comment) => {
              //   const { id, username } = jacob;
              //   Comment.create(comment, (err, comment) => {
              //     if (err) {
              //       console.log(err);
              //     } else {
              //       comment.author.id = id;
              //       comment.author.username = username;
              //       comment
              //         .save()
              //         .then(() => {
              //           campground.comments.push(comment);
              //           // console.log(campground.comments)
              //           // console.log(campground.comments)
              //           // console.log(comments)
              //           // console.log(comment)
              //         })
              //         .catch((err) => {
              //           console.log(err);
              //         });
              //       // campground.comments.push(comment);
              //       // campground.save();
              //     }
              //     campground.save();
              //     console.log(campground)
              //   });
              // });
            }
          }
        );
      });
      console.log(`Added ${campgrounds.length} Campgrounds`);
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
    cost: 10,
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
    location: "Gallipolis, OH",
    lat: 38.8098,
    lng: 82.2024,
  },
];

const comments = [
  {
    text:
      "I'm baby mustache master cleanse sriracha brunch, bitters succulents PBR&B taxidermy literally humblebrag gochujang adaptogen artisan venmo tacos. Single-origin coffee celiac jianbing farm-to-table poke. Asymmetrical ramps twee godard photo booth. Brooklyn cray la croix taiyaki, roof party deep v microdosing. Shabby chic coloring book you probably haven't heard of them disrupt schlitz air plant. Vaporware air plant single-origin coffee microdosing schlitz knausgaard hexagon hella.",
  },
  {
    text:
      "Flexitarian activated charcoal church-key, hashtag brooklyn man braid letterpress banjo pour-over neutra artisan dreamcatcher meditation. Raclette pinterest mlkshk, palo santo chillwave iceland artisan kickstarter activated charcoal readymade tilde PBR&B kombucha narwhal. Fanny pack franzen bicycle rights swag chambray. Marfa enamel pin intelligentsia narwhal blog.",
  },
  {
    text:
      "IPhone disrupt heirloom distillery. Butcher echo park slow-carb, lumbersexual godard fingerstache art party dreamcatcher mlkshk lomo franzen ethical. Salvia sustainable letterpress cred art party, VHS gastropub cloud bread drinking vinegar. Tumeric meh seitan raw denim leggings, blue bottle pour-over.",
  },
  {
    text:
      "Meggings authentic vinyl roof party small batch cardigan drinking vinegar. Heirloom knausgaard lumbersexual, semiotics twee actually cardigan helvetica subway tile. Hoodie health goth tofu poke. Venmo fingerstache drinking vinegar selvage kombucha meditation cray tote bag seitan church-key post-ironic.",
  },
  {
    text:
      "Intelligentsia cred craft beer butcher man braid. Sartorial godard pop-up art party snackwave blue bottle vexillologist street art knausgaard schlitz lo-fi etsy gentrify kogi. Everyday carry mlkshk 8-bit, whatever vegan chicharrones keytar cronut unicorn deep v offal. Everyday carry woke letterpress blog 8-bit twee, salvia vinyl hot chicken. Distillery pinterest lo-fi edison bulb woke, kogi flannel live-edge chambray post-ironic squid snackwave.",
  },
];

module.exports = seedDB;
