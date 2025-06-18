const express = require('express');
const app = express();

const index_router=require('./routes/index_router');
const user_router=require('./routes/user_router');

app.get('/',index_router);
app.use('/user',user_router);

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
});