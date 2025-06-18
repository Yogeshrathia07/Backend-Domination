const express=require('express');
const app=express();

const becrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello, World!');
});
// -----------------------------------------Hashing and Comparing Passwords-----------------------------------
// npm install bcrypt
app.post('/encrypt',async (req,res)=>{
    let salt=becrypt.genSaltSync(10);
    // res.send("hello");
    // res.send(`Salt generated: ${salt}`);
    let encrypt=await becrypt.hash('password', salt);
    res.send(`Encrypted password: ${encrypt}`);
})

app.post('/compare',async (req,res)=>{
    let password='password';
    let hash='$2b$10$hUQ3QlmZsKT1gK9VbwSVoOqW5Am1Zl6Sl0oJ.iABLQUY4e9EMdGHa';
    let isMatch=await becrypt.compare(password, hash);
    res.send(`Password match: ${isMatch}`);
})
// -----------------------------------------Generate and Decode JWT Token-----------------------------------
// npm install jsonwebtoken
app.post('/generate_token',(req,res)=>{
    let token=jwt.sign({email:"yug@gmail.com"},"secretkey",);
    res.send(`Generated Token: ${token}`);
})
app.post('/data_fetch',(req,res)=>{
    // try and cathch block to handle errors otherwise it will crash the server
    // if the token is invalid
    try{
        let data=jwt.decode(
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1Z0BnbWFpbC5jb20iLCJpYXQiOjE3NTAyMzAwMDB9.1U6ErYhpsIJsDt3_0i4PcA-AV8Kq41xSS3V6L7F8F_c",
            "secretkey"
        );
        // res.send(`Token is valid. Email: ${data}`);
        res.send(data);

    }
    catch(err){
        res.status(401).send('Invalid token');
    }
})
// ------------------------------------------Cookie Parser------------------------------------------------
// npm install cookie-parser to read cookies not for setting cookies

app.get('/set_cookie',(req,res)=>{
    res.cookie("name","yogesh",{
        maxAge: 1000 * 60 * 60 * 24, // 1 day i.e. 1000 milliseconds * 60 seconds * 60 minutes * 24 hours and by default you use milliseconds
        httpOnly: true, // prevents client-side JavaScript from accessing the cookie
        secure: false, // set to true if using HTTPS if false it will send cookie in HTTP
    });
    res.send('Cookie has been set');
})
// ------------------------------------------------Read Cookie------------------------------------------------
app.get('/read_cookie',(req,res)=>{
    res.send(`Cookie value: ${req.cookies.name}`);
})



app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});