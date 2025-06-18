const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/is_Logged_in');

const {index_controller} = require('../controllers/index_controller');


router.get('/',middleware,index_controller);

module.exports = router;