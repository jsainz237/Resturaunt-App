'use strict';
/**
 * Expose
 */

module.exports = function (app, passport) {

  // Home Routes
  app.use('/api', require('../app/Home')(passport));

  // User Routes
  app.use('/api/auth', require('../app/User')(passport));

  // Category Routes
  app.use('/api/category', require('../app/Category')(passport));

  // Food Routes
  app.use('/api/food', require('../app/Food')(passport));

  // Order Routes
  app.use('/api/orders', require('../app/Orders')(passport));
  

  /**
   * Error handling
   */
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).json({
      success: false,
      message: err.message,
    });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).json({
      success: false,
    });
  });
};
