const express = require('express');
const router = express.Router();
const foodController = require('../controller/food.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const multer = require('multer');
const upload = multer({ //dest: 'uploads/'  //configure multer to save uploaded files to 'uploads/' directory
    storage: multer.memoryStorage() // store file in memory as buffer
}); 


// prefix: /api/food   so POST /api/food/ (protected) -> only food partner can add food item : we use middleware for this
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.createFoodItem);

//for normal users so GET /api/food/ 
router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems); // both user and food partner can access this due to controller logic


module.exports = router;