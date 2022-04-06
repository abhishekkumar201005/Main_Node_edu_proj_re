const express = require("express");

//import router
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//middleware

app.use(express.json());

//mounting
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//-------------------------SERVER Part--------------------------
module.exports = app;
