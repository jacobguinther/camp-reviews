const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// ROOT
router.get('/', (req, res) => {
  res.render('landing');
});

// SIGNUP USER PAGE
router.get('/signup', (req, res) => {
  res.render('signup', { page: 'signup' });
});

// SIGNUP USER
router.post('/signup', (req, res) => {
  const { username, email } = req.body;
  const newUser = new User({ username, email });
  newUser.isAdmin = false;
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log(err);
      return res.render('signup', { error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      req.flash(
        'success',
        `Successfully Signed Up! Nice to meet you ${req.body.username}`,
      );
      return res.redirect('/campgrounds');
    });
    return true;
  });
});

// LOGIN USER PAGE
router.get('/login', (req, res) => {
  res.render('login', { page: 'login' });
});

// LOGIN USER
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'Welcome to YelpCamp!',
  }),
  (req, res) => {
    const lastpage = req.session.returnTo;
    req.session.returnTo = '';
    res.redirect(lastpage || '/campgrounds');
  },
);

// LOGOUT USER
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'See you later!');
  res.redirect('/campgrounds');
});

// USER PAGE
router.get('/profile', (req, res) => {
  res.render('profile', { page: 'profile', user: req.user });
});

// DELETE USER
router.delete('/profile', (req, res) => {
  console.log('Delete route hit');
  User.deleteOne({ _id: req.user._id })
    .then(() => {
      res.redirect('/campgrounds');
    })
    .catch((err) => {
      console.log('Error Deleting User', err);
    });
  res.redirect('/campgrounds');
});

module.exports = router;
