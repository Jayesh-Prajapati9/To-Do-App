const express = require('express')

const { userModel, userTodoModel } = require("./db");
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "TODO";

mongoose.connect("mongodb://localhost:27017/Todo");

const app = express();
app.use(express.json());

let port = 8080;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.post('/signup', async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    username = req.body.username;

    await userModel.create({
        email: email,
        password: password,
        username: username
    })

    res.json({
        message: "You Signed Up Successfully"
    })
});

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const respone = await userModel.findOne({
        email: email,
        password: password
    })
    if (respone) {
        const token = jwt.sign({
            id: respone._id.toString()
        }, JWT_SECRET);
        res.json({
            message: "You Signed In Successfully",
            token: token
        })
    } else {
        res.status(403).json({
            message: "You doesn't have an account"
        })
    }
})

function auth(req, res, next) {
    const token = req.headers.token;
    const user = jwt.verify(token, JWT_SECRET);

    if (user) {
        req.userId = token.id;
        next();
    } else {
        res.json("Please Sign In to Continue");
    }
};

app.post('/add_todo', auth, async (res, req) => {
    const userId = req.userId;
    const task = req.body.title;
    const status = req.body.status;
        await userTodoModel.create({
            userId: userId,
            task: task,
            status: status
        })
        res.json({
            message: "Todo Added SuccesFully"
        })
})

app.post('/todos', (req, res) => {
    const token = req.body.token;
    const verification = jwt.verify(token, JWT_SECRET);
    const email = verification.email;

    const userTodos = userModel.findOne({
        email: email,
    })
});
