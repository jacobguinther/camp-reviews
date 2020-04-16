// const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const moment = require("moment");
const faker = require("faker");

async function seedDB() {
  const numCampgrounds = 30;

  const randomIndex = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  
  console.clear();
  // console.log("name", faker.hacker.adjective(), faker.hacker.noun());
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
    users.forEach(async (user) => {
      const { username, email, isAdmin } = user;
      await User.register(
        { username, email, isAdmin },
        user.password,
        async (err, user) => {
          if (err) {
            console.log(err);
          } else {
            userArr.push(user);
            console.log(user.username);
            function checkAllUsers() {
              let count = 0;
              if (count === 500) return;
              if (userArr.length !== 2) {
                setTimeout(checkAllUsers, 100);
              } else {
                if (
                  userArr.length === 2 &&
                  user.username === users[users.length - 1].username
                ) {
                  console.log("userArr: ", userArr.length);
                  // campgrounds.forEach((randomCampground) => {
                  for (let i = 0; i < numCampgrounds; i++) {
                    let randomCampground = randomIndex(campgrounds);
                    let commentsArr = [];
                    let randomUser = randomIndex(userArr);

                    comments.forEach((comment) => {
                      comment.author.id = randomUser.id;
                      comment.author.username = randomUser.username;
                      commentsArr.push(comment)
                    });

                    Comment.create(commentsArr, async (err, allComments) => {
                      randomCampground.comments = allComments;
                      // console.log(randomCampground.comments.length)
                        randomCampground.author.id = randomUser.id;
                        randomCampground.author.username =
                          randomUser.username;
                        await Campground.create(randomCampground);
                    });
                  }
                  
                  console.log(`Added ${numCampgrounds} Campgrounds`);
                }
              }
              count += 100;
            }
            checkAllUsers();
          }
        }
      );
    });
    console.log(`Added ${users.length} Users`);
  }
  await deleteEverything(addUsers);
  // await deleteEverything(()=>{console.log("done")});
}

const users = [
  {
    username: "jgguinther",
    email: "jgguinther09@gmail.com",
    password: "password",
    isAdmin: false,
  },
  {
    username: "toridillon",
    email: "toridillon@yahoo.com",
    password: "password",
    isAdmin: true,
  },
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
  {
    name: "River Run",
    image:
      "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1259&q=80",
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
    name: "Fox Hills",
    image:
      "https://images.unsplash.com/photo-1563024767-5bd8ee292c3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
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
    name: "Lost Creek",
    image:
      "https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
    name: "Mirror Lake",
    image:
      "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
    name: "Peaceful Valley",
    image:
      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80",
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
    name: "Sleepy Grass",
    image:
      "https://images.unsplash.com/photo-1532876924456-d6460f2f56a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    cost: 0,
    location: "Ranu Kumbolo, Kabupaten Malang, Indonesia",
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
    text: "I caught a fish!",
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
    text: "Mushrooms Everywhere!",
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
