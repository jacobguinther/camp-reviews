const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameQueryFields: ['username', 'email'],
});
module.exports = mongoose.model('User', UserSchema);
