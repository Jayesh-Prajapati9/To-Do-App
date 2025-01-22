const express = require('express')

const { userModel, userTodoModel } = require("./db");
const mongoose = require('mongoose');

const { auth, JWT_SECRET } = require('./auth');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { z } = require('zod');
const { error } = require('console');

mongoose.connect("mongodb://localhost:27017/Todo");

const app = express();
app.use(express.json());

let port = 8080;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.post('/signup', async (req, res) => {

    const requiredBody = z.object({
        email: z.string().min(5).email(),
        password: z.string().min(5).max(15),
        username: z.string().min(3).max(20)
    });

    // const parsedData = requiredBody.parse(req.body);
    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            message: "Sign Up Failed",
            error: parsedData.error.issues
        })
        return
    }

    email = req.body.email;
    password = req.body.password;
    username = req.body.username;

    const hashedPassword = await bcrypt.hash(password, 5);

    await userModel.create({
        email: email,
        password: hashedPassword,
        username: username
    })

    res.json({
        message: "You Signed Up Successfully"
    })
});

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const response = await userModel.findOne({
        email: email,
    })

    if (!response) {
        res.status(403).json({
            message: "We don't have your credentials in our database"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if (passwordMatch) {

        const token = jwt.sign({
            id: response._id.toString()
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
