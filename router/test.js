var express = require("express");
var router = express.Router();

router.post('/', function(req, res, next) {

    var recvName = req.body.name;
    res.send(recvName);

});


module.exports = router;