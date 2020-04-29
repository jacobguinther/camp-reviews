const moment = require('moment');

const Campground = require('./models/campground');
const Review = require('./models/review');
const User = require('./models/user');

const users = [
  {
    username: 'rousteri',
    email: 'rousteri@yahoo.com',
    password: 'password',
    isAdmin: false,
  },
  {
    username: 'ernablay',
    email: 'ernablay@yahoo.com',
    password: 'password',
    isAdmin: false,
  },
  {
    username: 'termania',
    email: 'termania@yahoo.com',
    password: 'password',
    isAdmin: false,
  },
  {
    username: 'conahemo',
    email: 'conahemo@gmail.com',
    password: 'password',
    isAdmin: false,
  },
  {
    username: 'lOViONIC',
    email: 'lOViONIC@yahoo.com',
    password: 'password',
    isAdmin: true,
  },
  {
    username: 'vispicar',
    email: 'vispicar@yahoo.com',
    password: 'password',
    isAdmin: true,
  },
  {
    username: 'caTiMAHe',
    email: 'caTiMAHe@yahoo.com',
    password: 'password',
    isAdmin: true,
  },
  {
    username: 'auLcOuST',
    email: 'auLcOuST@yahoo.com',
    password: 'password',
    isAdmin: true,
  },
  {
    username: 'RosorNic',
    email: 'RosorNic@yahoo.com',
    password: 'password',
    isAdmin: true,
  },
  {
    username: 'IoNVestA',
    email: 'IoNVestA@yahoo.com',
    password: 'password',
    isAdmin: true,
  },
];
const campgrounds = [
  {
    name: "Cloud's Rest",
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 10,
    location: 'Gallipolis, OH',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 0,
    location: 'Gallipolis, OH',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 0,
    location: 'Gallipolis, OH',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
  {
    name: 'River Run',
    image:
      'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1259&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 0,
    location: 'Gallipolis, OH',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
  {
    name: 'Fox Hills',
    image:
      'https://images.unsplash.com/photo-1563024767-5bd8ee292c3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 0,
    location: 'Gallipolis, OH',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
  {
    name: 'Lost Creek',
    image:
      'https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 0,
    location: 'Gallipolis, OH',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
  {
    name: 'Mirror Lake',
    image:
      'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 0,
    location: 'Gallipolis, OH',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
  {
    name: 'Peaceful Valley',
    image:
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 0,
    location: 'Gallipolis, OH',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
  {
    name: 'Sleepy Grass',
    image:
      'https://images.unsplash.com/photo-1532876924456-d6460f2f56a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    cost: 0,
    location: 'Ranu Kumbolo, Kabupaten Malang, Indonesia',
    lat: 40.02,
    lng: -105.27,
    comments: [],
    author: {
      id: '',
      username: '',
    },
  },
];
const reviews = [
  {
    comment: 'I caught a fish!',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'This place is great but I wish there was internet',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'Mushrooms Everywhere!',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'Too many bugs',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'Its pet friendly',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'Beware of hippies.',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'Nobody helped me set up my tent.',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'I would go here again',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'This place is paradise',
    author: {
      id: '',
      username: '',
    },
  },
  {
    comment: 'Here is my review',
    author: {
      id: '',
      username: '',
    },
  },
];

/*eslint-disable*/
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
/* eslint-enable */

async function seedDB() {
  const numCampgrounds = 30;
  console.clear();
  console.log(moment().format('MMMM Do YYYY, h:mm a'));

  async function deleteEverything(callback) {
    await Campground.deleteMany({}, () => {
      console.log('Removed Campgrounds!');
    }).catch((err) => {
      console.log('ERROR DELETING CAMPGROUNDS:', err);
    });

    await Review.deleteMany({}, () => {
      console.log('Removed Reviews!');
    }).catch((err) => {
      console.log('ERROR DELETING REVIEWS:', err);
    });

    await User.deleteMany({}, () => {
      console.log('Removed Users!');
    }).catch((err) => {
      console.log('ERROR DELETING USERS:', err);
    });
    callback();
  }

  async function addUsers() {
    const userArr = [];
    users.forEach((user) => {
      const { username, email, isAdmin } = user;
      const USER = User.register({ username, email, isAdmin }, user.password);
      userArr.push(USER);
    });
    Promise.all(userArr)
      .then((resolvedUsersArr) => {
        for (let i = 0; i < numCampgrounds; i += 1) {
          if (i % campgrounds.length === 0) shuffle(campgrounds);
          let randomCampground = {};

          if (campgrounds[i]) {
            randomCampground = campgrounds[i];
          } else {
            randomCampground = campgrounds[i % campgrounds.length];
          }
          const reviewsArr = [];
          const randomNumberOfReviews = Math.round(
            Math.random() * (10 - 2) + 2,
          );
          shuffle(resolvedUsersArr);
          shuffle(reviews);
          for (let j = 0; j < randomNumberOfReviews; j += 1) {
            randomCampground.author.id = resolvedUsersArr[j].id;
            randomCampground.author.username = resolvedUsersArr[j].username;
            const review = reviews[j];
            review.author.id = resolvedUsersArr[j].id;
            review.author.username = resolvedUsersArr[j].username;
            review.rating = Math.round(Math.random() * (5 - 3) + 3);
            reviewsArr.push(review);
          }

          Review.create(reviewsArr, async (err, allReviews) => {
            randomCampground.location = 'Boulder, CO';
            randomCampground.reviews = allReviews;
            await Campground.create(randomCampground);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  await deleteEverything(addUsers);
}

module.exports = seedDB;
