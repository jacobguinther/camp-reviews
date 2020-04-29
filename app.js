require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const User = require('./models/user');
const seedDB = require('./seeds');

const reviewRoutes = require('./routes/reviews');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

mongoose.Promise = global.Promise;
const databaseUri = `${process.env.MONGODB_URI}` || 'mongodb://localhost/yelp_camp';

mongoose
  .connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected: ${databaseUri}`))
  .catch((err) => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === '/' && req.url.length > 1 && !test) res.redirect(301, req.url.slice(0, -1));
  else next();
});

app.locals.moment = require('moment');

// Seed Database
seedDB();

// PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`The YelpCamp Server Has Started: localhost:${process.env.PORT}`);
});
