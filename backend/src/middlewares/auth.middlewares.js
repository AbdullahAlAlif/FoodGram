const foodPartnerModel = require('../models/foodpartner.mode');
const userModel = require('../models/user.model');  
const jwt = require('jsonwebtoken');


async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Please Login" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.foodPartner = await foodPartnerModel.findById(decoded.id); //attach food partner info to req object so that controller can use it
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } 
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Please Login" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id); //attach user info to req object so that controller can use it
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };