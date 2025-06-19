const user_model=require('../modules/user_model')
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generate_token');


module.exports.register_user= async(req,res)=>{
    const {name,email,password}=req.body;

    try{
        let user=await user_model.findOne({email });
        if(user){
            return res.status(400).json({message: "User already exists,please login"});
        }
        let salt=await bcrypt.genSaltSync(10);
        let hash=await bcrypt.hash(password,salt);
        user=await user_model.create({
            name,
            email,
            password: hash
        });
        let token=generateToken({email});
        res.cookie("token", token,{
            httpOnly: true,
            secure:true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).send(user);

    }
    catch(error){
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

module.exports.login_user=async (req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await user_model.findOne({ email });
        if(!user){
            return res.status(400).json({message: "User does not exist, please register"});
        }
        let result =await bcrypt.compare(password,user.password);

        if(result){
            let token=generateToken({email});
            res.cookie("token",token),{
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            }
            res.status(200).send(user);
        }
        else{
            return res.status(400).json({message: "Invalid credentials"});
        }
    }
    catch(error){
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.logout_user=(req,res)=>{
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        maxAge: 0 // Clear the cookie
    });
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports.profile_user=(req,res)=>{
    // res.send("Successfully accessed profile");
    res.send(req.user); // Send user data from the request object
};