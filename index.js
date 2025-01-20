const express = require('express');
const app = express();

let port = 8080;
app.use(express.json);

app.get('/singup', (res, req) => {
});

app.post('\todos',(req,res)=>{
    const token = req.body.token;
    const verification= jwt.verify(token,JWT_SECRET);
    const email = verification.email;

    const UserTodos = UserModal.findOne({
        email: email;
    })
});
