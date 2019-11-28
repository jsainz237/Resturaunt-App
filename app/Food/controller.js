const Food = require('./model');
const Category = require('../Category/model');

// Create a food
const createFood = function (req, res, next) {
  const { name, category_id, price, description,image } = req.body;

  Category.findById(category_id)
    .exec()
    .then(category => {
      const food = new Food({
        name,
        category_id: category._id,
        price,
        description,
	image
      });

      food
        .save()
        .then(food => res.json(food))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

// Get all foods or get food by id
const getAllFood = function (req, res, next) {
  const { id, category_id } = req.query;

  if (category_id) {
    Category.findById(req.body.category_id)
      .exec()
      .then(() => {
        Food.find({ category_id: category_id })
          .exec()
          .then(food => res.json(food))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  } else if (id) {
    Food.findById(id)
      .exec()
      .then(food => res.json(food))
      .catch(err => next(err));
  } else {
    Food.find()
      .exec()
      .then(food => res.json(food))
      .catch(err => next(err));
  }
};

// Delete food by id
const deleteFoodById = function (req, res, next) {
  const { id } = req.params;

  Food.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.json({
        success: true
      })
    )
    .catch(err => next(err));
};

// Update food by id
const updateFoodById = function (req, res, next) {
  const { id } = req.params;

  Category.findById(req.body.category_id)
    .exec()
    .then(() => {
      Food.findByIdAndUpdate(id, req.body)
        .exec()
        .then(() => res.json({
          success: true
        }))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

module.exports = {
  createFood,
  getAllFood,
  deleteFoodById,
  updateFoodById
}
