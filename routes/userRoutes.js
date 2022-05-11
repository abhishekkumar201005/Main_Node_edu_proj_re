const express = require("express");
//import controller
const userCont=require('../controllers/userController');
const authController=require('../controllers/authController');
const router=express.Router();

// User Method
router.post('/signup',authController.signup);
router.post('/login',authController.login);

router.route('/').get(userCont.getAllUsers).post(userCont.addNewUser);

router.route('/:id').get(userCont.getUserById).patch(userCont.updateUser).delete(userCont.deleteUser);

module.exports=router;
