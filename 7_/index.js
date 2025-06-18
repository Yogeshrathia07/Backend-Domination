const express=require('express');
const app=express();
const userModel=require('./model/user_model');
const postModel=require('./model/post_model');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/create',async (req,res)=>{
    let createuser=await userModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    res.send(createuser);
})

app.post('/:username/createpost', async(req,res)=>{
    let user=await userModel.findOne({name:req.params.username});
    if(!user){
        return res.status(404).send('User not found');
    }
    let created_post=await postModel.create({
        content:req.body.content,
        user_ka_id:user._id
    });
    user.post_ka_id.push(created_post._id);
    await user.save();
    res.send({user,created_post});
})

app.get('/posts',async (req,res)=>{
    let users=await userModel.find().populate('post_ka_id');
    res.send(users);
});

app.get('/users',async (req,res)=>{
    let users=await userModel.find().populate('post_ka_id');
    res.send(users);
})

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});

app.get('/project-example', async (req, res) => {
  const result = await userModel.aggregate([
    {
      $project: {
        _id: 0,               // exclude _id
        userName: "$name",    // rename 'name' to 'userName'
        age: 1,               // include 'age'
        location: "$city",    // rename 'city' to 'location'
        isAdult: { $gte: ["$age", 18] } // computed field: true if age >= 18
      }
    }
  ]);

  res.send(result);
});
