var express = require("express");
var router = express.Router();
//var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var secretObj = require("../config/jwt");

router.post('/make', function(req, res, next) {

    var recvName = req.body.name;

    var sendingData;
    //console("recvName: " + recvName);

    if (recvName == "peter") // access된 이름일 경우
    {
        //default : HMAC SHA256
        var token = jwt.sign( // token generate
            {
                name: recvName // 토큰 내용(payload)  : 토큰의 조각들로 JSON 형식으로 다수의 정보 수용 가능
                    // iss: 토큰 발급자(issuer)
                    // sub: 토큰 제목(subject)
                    // aud: 토큰 대상자(audience)
                    // exp: 토큰 만료 시간(expiration), NumericDate 형식으로 되어 있어야 함 ex) 1480849147370
                    // nbf: 토큰 활성 날짜(not before), 이 날이 지나기 전의 토큰은 활성화되지 않음
                    // iat: 토큰 발급 시간(issued at), 토큰 발급 이후의 경과 시간을 알 수 있음
                    // jti: JWT 토큰 식별자(JWT ID), 중복 방지를 위해 사용하며, 일회용 토큰(Access Token) 등에 사용
            },
            secretObj.secret, {
                expiresIn: "100m" // 유효시간 100분
            }
        );
        console.log(token);
        res.cookie("user", token);
        sendingData = token;
        res.send(sendingData);

    } else { // access안 된 이름일 경우
        sendingData = "accessing is required";
        res.send(sendingData);
    }

});

router.put('/refresh', function(req, res, next) {

    var recvName = req.body.name;

    var sendingData;

    const requestToken = req.cookies.user;

    var isNotEmpty = jwt.verify(requestToken, secretObj.secret);

    if (isNotEmpty) {
        sendingData = "token is existed";
        res.send(sendingData);
    } else {
        if (recvName == "peter") // access된 이름일 경우
        {
            //default : HMAC SHA256
            var token = jwt.sign( // token generate
                {
                    name: recvName // 토큰 내용(payload)  : 토큰의 조각들로 JSON 형식으로 다수의 정보 수용 가능
                        // iss: 토큰 발급자(issuer)
                        // sub: 토큰 제목(subject)
                        // aud: 토큰 대상자(audience)
                        // exp: 토큰 만료 시간(expiration), NumericDate 형식으로 되어 있어야 함 ex) 1480849147370
                        // nbf: 토큰 활성 날짜(not before), 이 날이 지나기 전의 토큰은 활성화되지 않음
                        // iat: 토큰 발급 시간(issued at), 토큰 발급 이후의 경과 시간을 알 수 있음
                        // jti: JWT 토큰 식별자(JWT ID), 중복 방지를 위해 사용하며, 일회용 토큰(Access Token) 등에 사용
                },
                secretObj.secret, {
                    expiresIn: "100m" //유효시간 100분
                }
            );
            console.log(token);
            res.cookie("user", token);
            sendingData = token;
            res.send(sendingData);

        } else { // access안 된 이름일 경우
            sendingData = "accessing is required";
            res.send(sendingData);
        }
    }
});

router.delete('/delete', function(req, res, next) {

    var recvName = req.body.name;

    // 삭제는 불가능 -> access time 상세 지정 필수 
});

module.exports = router;