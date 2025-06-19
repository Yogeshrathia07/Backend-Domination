const user_model = require("../modules/user_model");
const jwt = require("jsonwebtoken");
module.exports.protect=async (req,res,next)=>{
    if(req.cookies.token){
        try{
            const data=jwt.verify(req.cookies.token,process.env.JWT_SECRET);
            req.user=await user_model
            .findOne({email:data.email})
            .select("-password");
            next();

        }
        catch(error){
            console.error('Error during authentication:', error);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    else{
        return res.status(401).json({ message: 'Unauthorized, please login' });
    }
}