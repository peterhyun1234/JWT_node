var jwt = require('jsonwebtoken');
var secretObj = require('./config/jwt');

exports.verifyToken = (req, res, next) => {

    try {
        var decoded = jwt.verify(req.cookies.user, secretObj.secret);
        res.loginFlag1 = 1;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.redirect('/login?allowed=jwt_expired');
        }
        res.loginFlag1 = 0;
        next();
    }
};