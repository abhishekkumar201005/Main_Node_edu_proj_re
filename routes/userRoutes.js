const express = require("express");
//import controller
const userCont=require('../controllers/userController');
const router=express.Router();

// User Method
router.route('/').get(userCont.getAllUsers).post(userCont.addNewUser);

router.route('/:id').get(userCont.getUserById).patch(userCont.updateUser).delete(userCont.deleteUser);

module.exports=router;
