var express = require('express');
var router = express.Router();
var { verifyToken } = require('../middleware/authCheck');


router.get('/get_test', verifyToken, function(req, res) {

    var tokenStatus = req.tokenStatus; // verifyToken을 거친 토큰 상태
    console("tokenStatus: " + tokenStatus);
    var data = "get test";
    res.send(data);

});


router.post("/post_test", verifyToken, function(req, res, next) {

    var tokenStatus = res.tokenStatus;
    console("tokenStatus: " + tokenStatus);
    //var recv_code = req.body.p_code;
    var data = "post test";
    res.send(data);

});

module.exports = router;