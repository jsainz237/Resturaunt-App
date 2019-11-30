const User = require('./model');
const crypto = require('../utils/crypto');
const jwt = require('jsonwebtoken');

const register = function (req, res, next) {
  const {
    name,
    email,
    password,
    role,
    address,
    phone
  } = req.body;

  const hashedPassword = crypto.encrypt(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    address,
    phone,
  });
  
  user
    .save()
    .then((user) => { 
      res.json({
        user,
        success: true,
      });
    })
    .catch(e => next(e));
};

const getUsers = function (req, res, next) {
  const {
    userId
  } = req.query;
  if (userId) {
    User
      .findById(userId)
      .exec()
      .then(user => res.json(user))
      .catch(e => next(e));
  } else {
    User
      .find()
      .exec()
      .then(user => res.json(user))
      .catch(e => next(e));
  }
};

/* Delete a user */
const deleteUserById = function (req, res, next) {
  const {
    userId
  } = req.params;

  User
    .findByIdAndRemove(userId)
    .exec()
    .then(() => res.json({ success: true }))
    .catch(e => next(e));
};

// Login is a curried function which takes passport
const login = function (passport) {
  return function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Invalid Credentials',
          user   : user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          next(err);
        }
        // Provide data since user is not a proper serialized object
        const token = jwt.sign(user.toObject(), 'secret_restaurant_app');
          
        return res.json({
          success: true,
          token,
        });
      });
    })(req, res);
  };
};

module.exports = {
  register,
  getUsers,
  deleteUserById,
  login,
};