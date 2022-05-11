const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//----------------User Schema------------------------
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'A User must have a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      //only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password; //for validation of password
      },
      message: 'Password are not the same',
    },
  },
  passwordChangedAt: Date,
});
userSchema.pre('save', async function (next) {
  //only run if password is modified
  if (!this.isModified('password')) return next();

  //hashing done in password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

//---create instance method---------to check passwords------
userSchema.methods.correctPassword = async function (
  candPassword,
  userPassword
) {
  return await bcrypt.compare(candPassword, userPassword);
};

//for user password recent change or not
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp; // compare old and new time
  }
  //false means NOT changed
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
