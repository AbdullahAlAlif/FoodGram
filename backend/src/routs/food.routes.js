const express = require('express');
const router = express.Router();
const foodController = require('../controller/food.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const multer = require('multer');
const upload = multer({ 
    storage: multer.memoryStorage() 
}); 



router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.createFoodItem); 


router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems); 


router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFoodItem);


router.post('/save',authMiddleware.authUserMiddleware,foodController.saveFoodItem)


router.get('/save',authMiddleware.authUserMiddleware,foodController.getSavedFoodItems)

module.exports = router;