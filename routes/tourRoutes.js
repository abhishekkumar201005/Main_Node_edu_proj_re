const express = require('express');

//controller for api...creation
const tourCont = require('../controllers/tourController');
const authCont = require('../controllers/authController');
//middleware
const router = express.Router();
// param middleware

// router.param('id', tourCont.checkID);

router.route('/top-5-cheap').get(tourCont.aliasTopTours, tourCont.getAllTours);

router.route('/tour-stats').get(tourCont.getTourStats);

router.route('/monthly-plan/:year').get(tourCont.getMonthlyPlan);
//Tours Method
router
  .route('/')
  .get(authCont.protect, tourCont.getAllTours)
  .post(tourCont.addNewTour);

router
  .route('/:id')
  .get(tourCont.getTourById)
  .patch(tourCont.updateTour)
  .delete(tourCont.deleteTour);

module.exports = router;
