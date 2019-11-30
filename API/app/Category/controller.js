const Category = require('./model');

// Create a Category 
const createCategory = function (req, res, next) {
  const {
    name,
    description
  } = req.body;

  const category = new Category({
    name,
    description
  });

  category
    .save()
    .then(category => res.json(category))
    .catch(err => next(err));
};

// Get all categories or category by id
const getAllCategory = function (req, res, next) {
  const {
    id,
  } = req.query;

  if (id) {
    Category
      .findById(id)
      .exec()
      .then(category => res.json(category))
      .catch(err => next(err));
  } else {
    Category
      .find()
      .exec()
      .then(category => res.json(category))
      .catch(err => next(err));
  }
};

// Delete a category by id
const deleteCategoryById = function (req, res, next) {

  const {
    id
  } = req.params;

  Category
    .findByIdAndRemove(id)
    .exec()
    .then(() => res.json({
      success: true,
    }))
    .catch(err => next(err));  
};

// Update a category by id
const updateCategoryById = function (req, res, next) {
  const {
    id,
  } = req.params;

  Category
    .findByIdAndUpdate(id, req.body)
    .exec()
    .then(() => res.json({
      success: true,
    }))
    .catch(err => next(err));

};

module.exports = {
  createCategory,
  getAllCategory,
  deleteCategoryById,
  updateCategoryById,
};