const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DB7');

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    post_ka_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]
})

module.exports=mongoose.model('User',userSchema);