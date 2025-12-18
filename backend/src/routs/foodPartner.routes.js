const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controller/foodPartner.controller');
const authMiddleware = require('../middlewares/auth.middlewares');


// prefix:/api/food so GET /api/food/:id  => get food partner and food items by food partner id
router.get('/:id', authMiddleware.authUserMiddleware, foodPartnerController.getFoodPartnerAndFoodItemsByFoodPartnerId);


module.exports = router;