const mongoose = require('mongoose');

const postSchema=mongoose.Schema({
    content:String,
    user_ka_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
})

module.exports=mongoose.model('Post',postSchema);