/*
 * Project Elll Singup Verify service.
 */

// Nodejs encryption with CTR
var crypto = require("crypto"),
        algorithm = "aes-256-ctr",
        password = "sdfghjjjjklklzxcvbnm";

var uuid = require('node-uuid');

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}


function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

exports.signupVerifyImpl = function (req, res)
{
    var mobile = req.body.mobile;
    var otp = req.body.otp;

    var authToken = encrypt(mobile);
    var uuidValue = uuid.v1();

    console.log(mobile + " - " + otp);
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end("Auth-token: " + authToken + "<br>" + "UUID: " + uuidValue);
};
