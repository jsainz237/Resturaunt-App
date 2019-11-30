/* !
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'customer', 'kitchen', 'staff'],
    default: 'customer',
  },
  address: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('User', UserSchema);
