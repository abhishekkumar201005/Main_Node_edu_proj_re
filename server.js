const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

// Established Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connection Established to Mongodb Database'));

//port---------
const port = 3000;
app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});
