var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

router.post("/", function(req, res, next) {

    var recvName = req.body.name;
    //console("recvName: " + recvName);

    var token = jwt.sign( // token generate
        {
            email_add: email
        },
        secretObj.secret, {
            expiresIn: "100m"
        }
    );

    var sqlString = 'SELECT password FROM user WHERE name="' + email + '";';
    con.query(sqlString, function(err, data) {
        var password = data[0].password;
        pass = crypto
            .createHash("sha256")
            .update(pass)
            .digest("base64");
        if (err) throw err;
        else {
            if (pass == password) {
                res.cookie("user", token);
                res.cookie("email", email);
                res.redirect("/index");
            } else {
                res.redirect("/login?allowed=not_allowed");
            }
        }
    });
});

module.exports = router;