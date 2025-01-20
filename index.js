const express = require('express')
const app = express()
const mongoose = require('mongoose');
const { UserModel, TodoModel } = require("./db");

let port = 8080;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use(express.json());

app.post('/signup', async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    username = req.body.username;

    await UserModel.insert({
        email: email,
        password: password,
        username: username
    })

    res.json({
        message: "You Signed Up Successfully"
    })
});

app.post('singin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const respone = await UserModel.findOne({
        email: email,
        password: password
    })
    if (respone) {
        const token = jwt.sign({id: respone._id.toString()})
        res.json({
            message: "You Signed In Successfully",
            token: token
        })  
    } else {
        res.json({
            message: "You doesn't have an account"
        })
    }
})

app.post('add-todo', (res, req) => {
    const task = req.body.task;
    const status = req.body.status;
})