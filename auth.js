const jwt = require('jsonwebtoken');
const JWT_SECRET = "TODO";

auth((req, res, next) => {
    const token = req.headers.token;
    const decodeData = jwt.verify(token, JWT_SECRET);

    if (user) {
        req.userId = token.userId;
        next();
    } else {
        res.json("Please Sign In to Continue");
    }
});
