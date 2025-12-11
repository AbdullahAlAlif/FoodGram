//to create API in routes file we need to use express.Router
const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller');
//user auth api routes
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/user/logout', authController.logoutUser);

//food partner auth api routes
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.post('/food-partner/logout', authController.logoutFoodPartner);

module.exports = router;