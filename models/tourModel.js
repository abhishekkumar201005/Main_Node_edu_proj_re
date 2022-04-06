const mongoose = require('mongoose');
//schema model
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Atour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A Tour must have a group size'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: String,
    required: [true, 'A Tour must have a difficulty'],
  },
  price: {
    type: Number,
    required: [true, 'A Tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, 'A Tour must have a summary'],
    trim: true,
  },
  description: {
    type: String,
    trim :true,
  },
  imageCover: {
    type: String,
    required: [true, 'A Tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select :false
  },
  startDates: [Date],
});
//--------model----
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
