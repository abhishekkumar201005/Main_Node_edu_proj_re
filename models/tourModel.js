const mongoose = require('mongoose');
// const validator = require('validator');

//schema model
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have maximum 40 character'],
      minlength: [10, 'A tour name must have minimmum 10 character'],
      // validate: [validator.isAlpha, 'tour name must only contain characters'],
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
      min: [1, 'rating must be above 1'],
      max: [5, 'rating must be equal or below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      required: [true, 'A Tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty is either :easy,medium or difficult',
      },
    },
    price: {
      type: Number,
      required: [true, 'A Tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'discount price({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      required: [true, 'A Tour must have a summary'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A Tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
//--------model----
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
