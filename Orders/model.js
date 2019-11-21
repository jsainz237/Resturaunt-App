const mongoose = require('mongoose');

const Orders = new mongoose.Schema({
  tableNum: {
    type: String,
    required: true,
  },
  orderNum: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status:{
    type: String,
    enum: ['new-order', 'pending', 'ready-for-delivery', 'delivered'],
    default: 'new-order',
  },
  paid:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Orders', Orders);