const express = require("express");
const app = express();

const mongooseconnection = require("./config/mongoose");
const userModel = require("./models/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/create", async (req, res, next) => {
  let createuser = await userModel.create({
    username: "yug",
    name: "Yug",
    email: "yug@gmail.com",
    password: "yug123",
  });
  console.log("user creaed successfully");
  res.send(createuser);
});

app.post("/create", async (req, res, next) => {
  let { username, name, email, password } = req.body;
  let createduser = await userModel.create({
    username,
    name,
    email,
    password,
  });
  res.send(createduser);
});
// -------------------------------------------------------
app.get("/read", async (req, res, next) => {
  let user = await userModel.findOne({ username: "yogesh" });
  if (user) {
    console.log("user found successfully");
    res.send(user);
  } else {
    console.log("user not found");
    res.send("user not found");
  }
});

app.get("/readall", async (req, res, next) => {
  let users = await userModel.find({});
  res.send(users);
});
// -------------------------------------------------------
app.get("/update", async (req, res, next) => {
  let user = await userModel.findOneAndUpdate(
    { username: "yug" },
    { username: "Yogesh" },
    { new: true }
  );
  res.send(user);
});

app.post("/update/:user", async (req, res, next) => {
  let { username, name, email, password } = req.body;
  let newuser = await userModel.findOneAndUpdate(
    { username: req.params.user},
    {
      username,
      name,
      email,
      password,
    },
    { new: true }
  );
  res.send(newuser);
});

// --------------------------------------------------------
app.get("/delete", async (req, res, next) => {
  try {
    let user = await userModel.findOneAndDelete({ username: "yogesh" });
    if (user) {
      res.send("User deleted successfully");
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/delete/:username',async (req,res,next)=>{
  let deleteuser=await userModel.findOneAndDelete({username:req.params.username});
  res.send(deleteuser ? "User deleted successfully" : "User not found");
})


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
