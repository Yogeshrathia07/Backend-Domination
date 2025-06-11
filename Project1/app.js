const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/",(req,res)=>{
    // res.render("index");
    fs.readdir(`./files`,(err,files)=>{
        if(err){
            res.send(`Error reading directory: ${err.message}`);
            return;
        }
        res.render("index",{files});
    })
})

app.get("/edit/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        if(err){
            res.send(`Error reading file: ${err.message}`);
            return;
        }
        res.render("edit",{filename:req.params.filename,data});
    })
})

app.post("/edit/:filename",(req,res)=>{
    fs.writeFile(`./files/${req.params.filename}`,req.body.content,(err)=>{
        if(err){
            res.send(`Error writing file: ${err.message}`);
            return;
        }
        res.redirect("/");

    })
})

app.get("/delete/:filename",(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        if(err){
            res.send(`Error deleting file: ${err.message}`);
            return;
        }
        res.redirect("/");
    })
})

app.get("/create",(req,res)=>{
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();

    // res.send(`Current Date: Day: ${day}, Month: ${month}, Year: ${year}`);
    const fn=`${day}-${month}-${year}.txt`;
    fs.writeFile(`./files/${fn}`,"This is a test file", (err) => {
        if (err) {
            res.send(`Error creating file: ${err.message}`);
        }
        else
        {
            res.send(`File created: ${fn}`);
        }
    });
});


app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});