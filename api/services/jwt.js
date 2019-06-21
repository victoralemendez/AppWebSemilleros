'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave_cifrado";

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        score: user.score,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix //30 dias antes de la expiración
    };

    return jwt.encode(payload, secret);
}