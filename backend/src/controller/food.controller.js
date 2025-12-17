const foodModel = require('../models/food.model');
const storageServices = require('../services/storage.service') ;
const { v4: uuid } = require('uuid');

// Create a new food item
async function createFoodItem(req, res) {

    //res.send("Food Item Created");
    //console.log(req.foodPartner);
    //console.log(req.body); // is undefined due to file format (video) for which we use multer
    //console.log(req.file); // multer adds file info to req.file object
    //using  uuid for unique name
    const fileUploadResult = await storageServices.uploadFile(req.file.buffer, uuid());
    //console.log(fileUploadResult); // useful url and fileId

    //name, description, video => provided by frontend
    //foodPartner => we get from auth middleware (req.foodPartner)
    try {
        const foodPartner = req.foodPartner._id;
        const foodItem = new foodModel({ name: req.body.name, description: req.body.description, video: fileUploadResult.url, foodPartner });
        await foodItem.save();
        res.status(201).json({ message: "Food item created successfully", foodItem });
    } catch (error) {
        res.status(500).json({ message: "Error creating food item", error });
    }
}

// get food items
async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({ });
        res.status(200).json({ 
            message: "Food items fetched successfully",
            foodItems });
    } catch (error) {
        res.status(500).json({ message: "Error fetching food items", error });
    }
}

module.exports = { createFoodItem, getFoodItems };