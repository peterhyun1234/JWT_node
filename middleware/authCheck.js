var jwt = require('jsonwebtoken');
var secretObj = require('../config/jwt');

exports.verifyToken = (req, res, next) => {
    res.tokenStatus = 1;
    next();
    // try {
    //     // /var decoded = jwt.verify(req.cookies.user, secretObj.secret);
    //     res.tokenStatus = 1;
    //     next();
    // } catch (err) {
    //     if (err.name === 'TokenExpiredError') {
    //         console.log("TokenExpiredError");
    //     }
    //     res.tokenStatus = 0;
    //     next();
    // }
};