const { promisify } = require('util');
const jwt = require('jsonwebtoken');
//---------USER MODEL---------------
const User = require('../models/userModel');

//_______Globle Catch Middleware
const catchAsync = require('../Utils/catchAsync');
const AppError = require('./../Utils/appError');

//-------TOKEN FXN--------------
const Token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//REST API------------------
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  //--------token-----------------
  const token = Token(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) check email and password exist
  if (!email || !password) {
    return next(new AppError('please provide email and password', 400));
  }
  //2) check if user is exist and password is correct
  const user = await User.findOne({ email }).select('+password');
  //const correct=(await user.correctPassword(password, user.password)) ;
  if (!user || !(await user.correctPassword(password, user.password))) {
    //401----unauthorised
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3) if everthing ok,send token to client
  const token = Token(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

//middleware----protect
exports.protect = catchAsync(async (req, res, next) => {
  //1)getting token and check if it exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not login,please login first to access', 401)
    );
  }
  //2) we have to validate token---verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3)check user is exist or not
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token is no longer exist', 401)
    );
  }
  //4) check if user change password after jwt issued
  if (freshUser.changePasswordAfter(decoded.iat)) {
    return new AppError(
      'user recently changed password,please log in again',
      401
    );
  }
  //grant acccess to new protected route
  req.user=freshUser;
  next();
});
