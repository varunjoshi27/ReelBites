const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  video: {
    type: String,
    required: true,
  },
});
