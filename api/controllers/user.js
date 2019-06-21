'user strict'


var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


// Funcion encargada de la autenticación de usuarios mediante credenciales
function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!user) {
                res.status(404).send({ message: "El usuario no existe" });
            } else {
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        // Devolver datos del usuario identificado
                        if (params.getHash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });       
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: "Usuario o contraseña incorrectas" });
                    }
                });
            }
        }
    });
}


// Funcion encargada del guardado de nuevos usuarios
function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';
    user.score = params.score;
    if (params.password) {
        // Cifrado de clave
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                // Almacenamiento de usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    } else {
                        if (!userStored) {
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        } else {
                            res.status(200).send({user: user_stored});
                        }
                    }
                });
            } else {
                res.status(200).send({message: 'Introduce todos los campos'});        
            }
        });
    } else {
        res.status(200).send({message: 'Introduce la contraseña'});
    }
}

module.exports = {
    loginUser,
    saveUser
};
