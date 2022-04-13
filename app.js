const express = require('express');

//import router
const AppError=require('./Utils/appError');
const globalErrorHandler=require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//middleware

app.use(express.json());

//mounting
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

app.use(globalErrorHandler);
//-------------------------SERVER Part--------------------------
module.exports = app;
