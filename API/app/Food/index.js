var router = require('express').Router();
var FoodController = require('./controller');
const Authorization = require('../utils/roleAuthorization');

module.exports = function (passport) {
  /* Get all foods or get food by id*/
  router.get('/',
    //passport.authenticate('jwt', { session: false }),
    //Authorization.roleAuthorization(['admin', 'customer']),
    FoodController.getAllFood
  );

  /* Add a new food */
  router.post('/',
    //passport.authenticate('jwt', { session: false }),
    //Authorization.roleAuthorization(['admin']),
    FoodController.createFood
  );

  /* Delete a food by id */
  router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    Authorization.roleAuthorization(['admin']),
    FoodController.deleteFoodById
  );
  
  /* Update a food */
  router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    Authorization.roleAuthorization(['admin']),
    FoodController.updateFoodById
  );

  return router;
};