var express = require('express');
var router = express.Router();


router.get('/get_test', function(req, res) {

    var data = "get test";
    res.send(data);

});


router.post("/post_test", function(req, res, next) {

    //var recv_code = req.body.p_code;
    var data = "post test";
    res.send(data);

});

module.exports = router;