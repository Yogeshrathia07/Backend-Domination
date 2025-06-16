const express = require('express');
const app = express();

const userModel=require('./models/user_model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/create',async (req,res)=>{
    let user=await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    res.send(user);
})

app.post('/:username/create',async (req,res)=>{
    let user=await userModel.findOne({name:req.params.username});
    if(!user){
        return res.status(404).send('User not found');
    }
    user.post.push({content:"this is post"});
    await user.save();
    res.send(user);
})

app.listen(3000,(req,res)=>{
    console.log('Server is running on http://localhost:3000');
});