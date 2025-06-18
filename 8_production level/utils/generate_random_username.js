const crypto = require('crypto');
module.exports=()=>{
    const randomBytes = crypto.randomBytes(4); // Generate 4 random bytes
    const randomNumber = parseInt(randomBytes.toString('hex'), 16); // Convert to a number
    const username = `user${randomNumber}`; // Create a username with the random number
    return username;
}