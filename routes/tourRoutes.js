const express = require('express');

//controller for api...creation
const tourCont = require('../controllers/tourController');

//middleware
const router = express.Router();
// param middleware

// router.param('id', tourCont.checkID);

router.route('/top-5-cheap').get(tourCont.aliasTopTours, tourCont.getAllTours);
//Tours Method
router.route('/').get(tourCont.getAllTours).post(tourCont.addNewTour);

router
  .route('/:id')
  .get(tourCont.getTourById)
  .patch(tourCont.updateTour)
  .delete(tourCont.deleteTour);

module.exports = router;
