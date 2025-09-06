const mongoose = require('mongoose');

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log('Connected Successfully');
    })
    .catch((err) => {
      console.log('The error is ', err);
    });
}

module.exports = connectDB;
