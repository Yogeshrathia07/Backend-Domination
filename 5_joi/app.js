const express = require('express');
const app = express();
const { validateUser, user } = require('./models/user-model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("hello");
});

app.post('/create', async (req, res) => {
    const { name, username, age, contact, email } = req.body;
    const { error } = validateUser({ name, username, age, contact, email });
    if (error) return res.status(400).send(error.message);
    res.send("Data is valid");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
