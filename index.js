const express = require('express')
const app = express()

let port = 8080;

app.get('/', (res, req) => {
    res.send("Helloo World");       
});

