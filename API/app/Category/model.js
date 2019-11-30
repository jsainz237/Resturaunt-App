const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Category', Category);