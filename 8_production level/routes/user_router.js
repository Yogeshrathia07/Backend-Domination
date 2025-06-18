const express = require('express');
const user_router=express.Router();

const {user_controller}=require('../controllers/user_controller');

user_router.get('/',user_controller);

module.exports = user_router;