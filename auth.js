const jwt = require('jsonwebtoken');
const JWT_SECRET = "TODO";

const auth = ((req, res, next) => {
    const token = req.headers.token;
    const decodeData = jwt.verify(token, JWT_SECRET);

    if (user) {
        req.userId = token.userId;
        next();
    } else {
        res.json("Please Sign In to Continue");
    }
});

module.exports = {
    auth,
    JWT_SECRET
};
