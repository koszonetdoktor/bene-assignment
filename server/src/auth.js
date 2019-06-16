const jwt = require("jsonwebtoken")
const config = require("./config.json")

module.exports = function authorization(req, res, next) {
    const token =
        req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, config.auth.secret, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
}