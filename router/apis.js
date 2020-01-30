var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secretObj = require('../config/jwt');

// 라우터 레벨 미들웨어 for authentification
// 모든 api에 적용
router.use(function(req, res, next) {
    console.log('Time:', Date.now());

    const requestToken = req.cookies.user;

    try {
        jwt.verify(requestToken, secretObj.secret);
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.log("access err: " + err.name);
            res.send(err.name);
        } else {
            console.log("access err: " + err.name);
            res.send(err.name);
        }
    }
});


router.get('/get_test', function(req, res) {

    var data = "get test";
    res.send(data);

});


router.post("/post_test", function(req, res, next) {

    var recvName = req.body.name;
    var data = "post test";
    res.send(recvName);

});

module.exports = router;