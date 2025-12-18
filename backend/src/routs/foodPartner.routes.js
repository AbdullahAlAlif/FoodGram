const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controller/foodPartner.controller');
const authMiddleware = require('../middlewares/auth.middlewares');



router.get('/:id', authMiddleware.authUserMiddleware, foodPartnerController.getFoodPartnerAndFoodItemsByFoodPartnerId);


module.exports = router;