const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');


// get food partner and food items by food partner id
async function getFoodPartnerAndFoodItemsByFoodPartnerId(req, res) {
    try {
        const foodPartnerId = req.params.id;
        const foodPartner = await foodPartnerModel.findById(foodPartnerId); // check if food partner exists
        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId }); // find food items by food partner id
        res.status(200).json({ 
            message: "Food partner and items fetched successfully", 
            foodPartner : {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching food partner and items", error });
    }
}


module.exports ={ getFoodPartnerAndFoodItemsByFoodPartnerId };