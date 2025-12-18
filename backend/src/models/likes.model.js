const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user',required:true },
    food:{type:mongoose.Schema.Types.ObjectId, ref:'Food',required:true },
}, { timestamps: true });

module.exports = mongoose.model('Likes', likesSchema);  