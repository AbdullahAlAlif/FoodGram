const foodModel = require('../models/food.model');
const storageServices = require('../services/storage.service') ;
const { v4: uuid } = require('uuid');
const likesModel = require('../models/likes.model');
const saveModel = require('../models/save.model');


async function createFoodItem(req, res) {
   
    try {
        const fileUploadResult = await storageServices.uploadFile(req.file.buffer, uuid());
        const foodPartner = req.foodPartner._id;
        const foodItem = new foodModel({ name: req.body.name, description: req.body.description, video: fileUploadResult.url, foodPartner });
        await foodItem.save();
        res.status(201).json({ message: "Food item created successfully", foodItem });
    } catch (error) {
        res.status(500).json({ message: "Error creating food item", error });
    }
}


async function getFoodItems(req, res) {  
    try {
        const foodItems = await foodModel.find({});
        res.status(200).json({ 
            message: "Food items fetched successfully",
            foodItems });
    } catch (error) {
        res.status(500).json({ message: "Error fetching food items", error });
    }
}


async function likeFoodItem(req, res) {
    try {
        const userId = req.user._id;
        const foodId = req.body.foodId;

        
        const existingLike = await likesModel.findOne({ user: userId, food: foodId });
        if (existingLike) {
            await likesModel.deleteOne({ _id: existingLike._id });

            await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

            return res.status(200).json({ message: "Food unlike successfully" });
        }

       
        const like = await likesModel.create({ user: userId, food: foodId });

        await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

        res.status(201).json({ message: "Food item liked successfully", like });

    } catch (error) {
        res.status(500).json({ message: "Error liking food item", error });
    }
}


async function saveFoodItem(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSavedFoodItems(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}

module.exports = { createFoodItem, getFoodItems, likeFoodItem, saveFoodItem, getSavedFoodItems };