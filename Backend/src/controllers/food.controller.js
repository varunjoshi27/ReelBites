const foodModel = require('../models/food.model');

async function createFood(req, res) {
  console.log(req.foodpartner);
  console.log('Food Item Added');
}

module.exports = {
  createFood,
};
