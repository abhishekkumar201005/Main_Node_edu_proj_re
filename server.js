const mongoose = require('mongoose');
const dotenv = require('dotenv');

// always done at the start of file
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception ...');
  console.log(err);
});

//address of env file ---reading of file reqm is once

dotenv.config({ path: './config.env' });

//express file 
const app=require('./app');
// Established Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connection Established to Mongodb Database'))
  .catch((err) => console.log('Error'));

//port---------
const port = 3000;
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHandler Rejection...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
