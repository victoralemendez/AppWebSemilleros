'user strict'

var User = require('../models/user');
var jwt = require('../services/jwt');
var fileSys = require('fs');
var path = require('path');


// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/users/images/";

// Funcion encargada de la autenticación de usuarios mediante credenciales
function login(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({ email: email.toLowerCase(), admitted: true }, function (err, user) {
        if (err) {
            res.status(500).send({ message: "Error en la petición" });
        } else {
            if (!user) {
                res.status(404).send({ message: "El usuario no existe o aún no se ha aceptado su solicitud" });
            } else {
                if (password == user.password) {
                    if (params.getHash) {
                        res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        res.status(200).send({ user });
                    }
                } else {
                    res.status(401).send({ message: "Usuario o contraseña incorrectas" });
                }
            }
        }
    });
}

// Funcion para almacenar una imagen a un usuairo
function uploadImage(req, res) {
    var userId = req.params.id;
    var fileName = 'No subido';
    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[3]; // 3 dado que [1] = users, [2] = images  entonces ruta : users/images/
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
        if (fileExt == 'png' || fileExt == 'jpg') {
            User.findByIdAndUpdate(userId, { image: fileName }, (err, updatedUser) => {
                if (!updatedUser) {
                    res.status(500).send({ message: 'No se pudo actualizar el usuario' });
                } else {
                    res.status(200).send({ user: updatedUser, image: fileName });
                }
            });
        } else {
            res.status(409).send({ message: 'Extensión del archivo no válido' });
        }
    } else {
        res.status(404).send({ message: 'No se ha subido ninguna imagen' });
    }
}

// Funcion que retorna la imagen de un usuario especificp
function getImage(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = uploadImagesPath + imageFile;
    fileSys.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(404).send({ message: "No existe la imagen..." });
        }
    });
}

function update(req, res) {
    var id = req.params.id;
    var user = req.body;
    User.findByIdAndUpdate(id, user, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar el usuario, comuniquese con el administrador" });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: "No se encontró el usuario" });
            } else {
                res.status(200).send({ user: userUpdated });
            }
        }
    });
}

function remove(req, res) {
    var id = req.params.id;
    User.findByIdAndDelete(id, function (err, userDeleted) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar el usuario, comuniquese con el administrador" });
        } else {
            if (!userDeleted) {
                res.status(404).send({ message: "No se encontró el usuario" });
            } else {
                res.status(200).send({ user: userDeleted });
            }
        }
    });
}

function getUsersNotActivated(req, res) {
    User.find({ admitted: false }, function (err, users) {
        if (err) {
            res.status(500).send({ message: "Error interno, contacte con el administrador" });
        } else {
            if (!users) {
                res.status(404).send({ message: "No se encontraron solicitudes registradas" });
            } else {
                res.status(200).send({ users });
            }
        }
    });
}

function getUsersActivated(req, res) {
    User.find({ admitted: true }, function (err, users) {
        if (err) {
            res.status(500).send({ message: "Error interno, contacte con el administrador" });
        } else {
            if (!users) {
                res.status(404).send({ message: "No se encontraron usuarios registrados" });
            } else {
                res.status(200).send({ users });
            }
        }
    });
}


// Funcion para crear un usuario nuevo
function createNewUser(userParams) {
    var user = new User();
    user.name = userParams.name;
    user.surname = userParams.surname;
    user.email = userParams.email;
    user.password = userParams.password;
    user.adminRole = false;
    user.admitted = false;
    user.bornDate = userParams.bornDate;
    user.image = 'null';
    user.score = 0;
    user.cvlac = userParams.cvlac;
    user.career = userParams.career;
    user.semester = userParams.semester;
    user.student = userParams.student;
    return user;
}

// Funcion encargada del guardado de nuevos usuarios
function register(req, res) {
    var params = req.body;
    var user = createNewUser(params);
    User.findOne({ email: user.email.toLowerCase() }, (err, userFound) => {
        if (err) {
            res.status(500).send({ message: "Error interno, intente de nuevo" });
        } else {
            if (userFound) {
                res.status(409).send({ message: "Error: Ya se encuentra registrado un usuario con ese correo electronico" });
            } else {
                user.save(function (err, userStored) {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario, intente de nuevo' });
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'Error: No se ha registrado el usuario' });
                        } else {
                            res.status(201).send({ user: userStored });
                        }
                    }
                });
            }
        }
    });
}


module.exports = {
    login,
    register,
    update,
    remove,
    getUsersNotActivated,
    getUsersActivated,
    uploadImage,
    getImage
};
