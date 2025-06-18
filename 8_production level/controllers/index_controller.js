const random_username = require('../utils/generate_random_username');
module.exports.index_controller= (req,res)=>{
    console.log('Random Username:', random_username());
    res.send('index router');
};