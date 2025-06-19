const express = require('express');
const app=express();

require('dotenv').config();
const connectDB = require('./config/mongoose_connection');
const cookieParser = require('cookie-parser');
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const authRoutes = require('./routes/auth_routes');

// app.get('/',(req,res)=>{
//     res.send('Hello World!');
// });

app.use('/api/auth',authRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running http://localhost:${process.env.PORT || 3000}`);
});