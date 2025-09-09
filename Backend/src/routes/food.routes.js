const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/*   POST (/api/food/) {Protected } */
router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  foodController.createFood
);

module.export = router;
