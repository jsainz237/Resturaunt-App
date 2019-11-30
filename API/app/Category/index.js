var router = require('express').Router();
var CategoryController = require('./controller');
const Authorization = require('../utils/roleAuthorization');

module.exports = function (passport) {

  /* Get all categories or get a category by id*/
  router.get('/',
    passport.authenticate('jwt', { session: false }),
    Authorization.roleAuthorization(['admin', 'customer']),
    CategoryController.getAllCategory
  );

  /* Add a new category */
  router.post('/',
    passport.authenticate('jwt', { session: false }),
    Authorization.roleAuthorization(['admin']),
    CategoryController.createCategory
  );

  /* Delete a category by id */
  router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    Authorization.roleAuthorization(['admin']),
    CategoryController.deleteCategoryById
  );
  
  /* Update a category by id */
  router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    Authorization.roleAuthorization(['admin']),
    CategoryController.updateCategoryById
  );

  return router;
};