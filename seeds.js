const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const moment = require("moment");

async function seedDB() {
  console.clear();
  console.log(moment().format("MMMM Do YYYY, h:mm a"));

  // Delete Everything In Database
  async function deleteEverything(callback) {
    await Campground.deleteMany({}, () => {
      console.log("Removed Campgrounds!");
    });

    await Comment.deleteMany({}, () => {
      console.log("Removed Comments!");
    });

    await User.deleteMany({}, () => {
      console.log("Removed Users!");
    });
    callback();
  }
  async function addUsers() {
    let userArr = [];

    users.forEach((user) => {
      User.register(
        { username: user.username, isAdmin: user.isAdmin },
        user.password,
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            userArr.push(user);
            if (user.username === users[users.length - 1].username) {
              campgrounds.forEach((campground) => {
                comments.forEach((comment) => {
                  console.log(userArr.length);
                  const randomUser = (arr) => {
                    return arr[Math.floor(Math.random() * arr.length)];
                  };
                  let random = ""
                  random = randomUser(userArr)
                  comment.author.id = random.id;
                  comment.author.username = random.username;
                  Comment.create(comment, async (err, com) => {
                    campground.comments.push(com);
                    if (campground.comments.length === comments.length) {
                      campground.author.id = random.id;
                      campground.author.username = random.username;
                      await Campground.create(campground);
                    }
                  });
                });
              });
              console.log(`Added ${campgrounds.length} Campgrounds`);
            }
          }
        }
      );
    });
    console.log(`Added ${users.length} Users`);
  }
  await deleteEverything(addUsers);
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
    comments: [],
    author: {
      id: "",
      username: "",
    },
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
    comments: [],
    author: {
      id: "",
      username: "",
    },
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
    comments: [],
    author: {
      id: "",
      username: "",
    },
  },
];

const comments = [
  {
    text:
      "I'm baby mustache master cleanse sriracha brunch, bitters succulents PBR&B taxidermy literally humblebrag gochujang adaptogen artisan venmo tacos. Single-origin coffee celiac jianbing farm-to-table poke. Asymmetrical ramps twee godard photo booth. Brooklyn cray la croix taiyaki, roof party deep v microdosing. Shabby chic coloring book you probably haven't heard of them disrupt schlitz air plant. Vaporware air plant single-origin coffee microdosing schlitz knausgaard hexagon hella.",
    author: {
      id: "",
      username: "",
    },
  },
  {
    text: "This place is great but I wish there was internet",
    author: {
      id: "",
      username: "",
    },
  },
  {
    text:
      "IPhone disrupt heirloom distillery. Butcher echo park slow-carb, lumbersexual godard fingerstache art party dreamcatcher mlkshk lomo franzen ethical. Salvia sustainable letterpress cred art party, VHS gastropub cloud bread drinking vinegar. Tumeric meh seitan raw denim leggings, blue bottle pour-over.",
    author: {
      id: "",
      username: "",
    },
  },
  {
    text: "Too many bugs",
    author: {
      id: "",
      username: "",
    },
  },
  {
    text: "Its pet friendly",
    author: {
      id: "",
      username: "",
    },
  },
];

module.exports = seedDB;
