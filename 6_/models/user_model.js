const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DB6');
const postSchema = mongoose.Schema({
    content:String,
    date: {
        type: Date,
        default: Date.now
    }
})
const userSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    post:[postSchema]
})
module.exports = mongoose.model('User', userSchema);