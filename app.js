const express = require('express');
const app=express();

const path = require('path');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
const fs = require('fs');

app.get('/', (req, res) => {
    fs.readdir(`./hisaab`,(err,file)=>{
        if(err) return res.status(500).send(err);
        res.render('index', { files: file });
    });
});

app.get('/create',(req,res)=>{
    res.render('create');
});

// app.post('/createhisaab',(req,res)=>{
//     // res.send(req.body);
//     const date= new Date();
//     const current_date=(`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`);
//     fs.writeFile(`./hisaab/${current_date}.txt`,req.body.content,(err)=>{
//         if(err) return res.status(500).send(err);
//         res.redirect('./');
//     })
// });

app.post('/createhisaab', (req, res) => {
    const date = new Date();
    const baseName = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const dirPath = './hisaab';
    let fileName = `${baseName}.txt`;
    let filePath = path.join(dirPath, fileName);

    let counter = 1;

    // Loop to find a unique file name
    while (fs.existsSync(filePath)) {
        fileName = `${baseName}(${counter}).txt`;
        filePath = path.join(dirPath, fileName);
        counter++;
    }

    // Write the file
    fs.writeFile(filePath, req.body.content, (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});


app.get('/edit/:filename',(req,res)=>{
    fs.readFile(`./hisaab/${req.params.filename}`,'utf-8',(err,data)=>{
        res.render('edit', { data, filename: req.params.filename });
    })
});

app.post('/update/:filename',(req,res)=>{
    // console.log(req.params.filename);
    fs.writeFile(`./hisaab/${req.params.filename}`,req.body.content,(err)=>{
        if(err) return res.status(500).send(err);
        res.redirect("/");
    })
});

app.get('/hisaab/:filename',(req,res)=>{
    fs.readFile(`./hisaab/${req.params.filename}`,'utf-8',(err,data)=>{
        if (err) return res.sttus(500).send(err);
        res.render('hisaab', { data, filename: req.params.filename });
    });
});

app.get('/delete/:filename',(req,res)=>{
    fs.unlink(`./hisaab/${req.params.filename}`,(err)=>{
        if(err) return res.status(500).send(err);
        res.redirect('/');
    });
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});