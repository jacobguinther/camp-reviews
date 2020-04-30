const express = require('express');

const middleware = require('../middleware');
const Review = require('../models/review');
const Campground = require('../models/campground');

const router = express.Router({ mergeParams: true });
const { isLoggedIn, checkUserReview, checkIfUserReviewed } = middleware;

// CREATE REVIEW PAGE
router.get('/new', isLoggedIn, checkIfUserReviewed, (req, res) => {
  res.render('reviews/new', { campground: req.campground });
});

// CREATE REVIEW
router.post('/', isLoggedIn, checkIfUserReviewed, (req, res) => {
  console.log('CREATE REVIEW ROUTE HIT');
  const { comment, rating } = req.body;
  const { _id: id, username } = req.user;
  const newReview = { comment, rating };
  const CAMPGROUND = Campground.findById(req.params.id);
  const REVIEW = Review.create(newReview);
  const promiseArr = [CAMPGROUND, REVIEW];
  Promise.all(promiseArr)
    .then((values) => {
      const campground = values[0];
      const review = values[1];

      review.author.id = id;
      review.author.username = username;
      review.save();
      campground.reviews.push(review);
      campground.save();
      req.flash('success', 'Created a review!');
      res.redirect(`/campgrounds/${campground._id}`);
    })
    .catch((err) => {
      console.log('ERROR CREATING REVIEW:', err);
      req.flash('error', 'Error creating review.');
      res.redirect(`/campgrounds/${req.params.id}`);
    });
});

// UPDATE REVIEW PAGE
router.get('/:reviewId/edit', isLoggedIn, checkUserReview, (req, res) => {
  res.render('reviews/edit', {
    campground_id: req.params.id,
    review: req.review,
  });
});

// UPDATE REVIEW
router.put('/:reviewId', isLoggedIn, checkUserReview, (req, res) => {
  console.log('UPDATE REVIEW ROUTE HIT');
  const { comment, rating } = req.body;
  const review = { comment, rating };
  const REVIEW = Review.findByIdAndUpdate(req.params.reviewId, review);
  REVIEW.then(() => {
    res.redirect(`/campgrounds/${req.params.id}`);
  }).catch((err) => {
    console.log('ERROR UPDATING REVIEW', err);
    res.render('edit');
  });
});

// DELETE REVIEW
router.delete('/:reviewId', isLoggedIn, checkUserReview, (req, res) => {
  Campground.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        reviews: req.review.id,
      },
    },
    (err1) => {
      if (err1) {
        console.log('ERROR DELETING REVIEW:', err1);
        req.flash('error', err1.message);
        res.redirect('/');
      } else {
        req.review.remove((err2) => {
          if (err2) {
            req.flash('error', err2.message);
            return res.redirect('/');
          }
          req.flash('error', 'Review deleted!');
          return res.redirect(`/campgrounds/${req.params.id}`);
        });
      }
    },
  );
});

module.exports = router;
