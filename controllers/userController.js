const User = require('../models/userModel');
//------middleware catch--------------
const catchAsync = require('../Utils/catchAsync');
//-----------------------user api calling------------------
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();
  //Send response
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
exports.addNewUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'routing is not done yet',
  });
};
exports.getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'routing is not done yet',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'routing is not done yet',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'routing is not done yet',
  });
};
