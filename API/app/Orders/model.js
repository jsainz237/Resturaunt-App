const mongoose = require('mongoose');

const Orders = new mongoose.Schema({
  orderNum: {
    type: String,
    required: true,
  },
  tableNum: {
    type: Number,
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
