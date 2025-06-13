const mongoose = require('mongoose');
const joi = require('joi');

mongoose.connect('mongodb://localhost:27017/joiDB');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, minlength: 3 },
    name: { type: String, required: true, minlength: 3 },
    age: { type: Number, min: 18, required: true },
    contact: { type: Number, required: true },
    email: { type: String, required: true, minlength: 5 }
});

function validateUser(data) {
    const schema = joi.object({
        username: joi.string().min(3).required(),
        name: joi.string().min(3).required(),
        age: joi.number().min(18).required(),
        contact: joi.number().required(),
        email: joi.string().min(5).required().email()
    });
    return schema.validate(data);
}

const user = mongoose.model('User', userSchema);

module.exports = { user, validateUser };
