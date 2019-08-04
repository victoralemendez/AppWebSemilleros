'use strict'

var RequestLoan = require('../models/request-loan');

// Funcion que crea un prestamo
function create(params) {
    var loan = new RequestLoan();
    loan.resource = params.resource;
    loan.user = params.user;
    return loan;
}

// Funcion que almacena un prestamo en la base de datos
function register(req, res) {
    var request = create(req.body);
    RequestLoan.findOne({ user: request.user, resource: request.resource }, function (err, foundRequests) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (foundRequests) {
                res.status(409).send({ message: "Ya se encuentra una solicitud realizada para este dispositivo" });
            } else {
                store(res, request);
            }
        }
    });
}

// Funcion encargada de almacenar un prestamo
function store(res, request) {
    request.save(function (err, storedRequest) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (!storedRequest) {
                res.status(500).send({ message: "Ocurrió un error al guardar el préstamo, comuniquese con el Administrador" });
            } else {
                res.status(201).send({ request: storedRequest });
            }
        }
    });
}

// Funcion que retorna todos los prestamos por usuario, funcion optimizada para consumir pocos recursos
function getReqPerUser(req, res) {
    var query = RequestLoan.aggregate([
        {
            $group: {
                _id: "$user",
                resources: { $push: "$resource" }
            }
        },
        {
            $lookup: {
                from: 'resources',
                localField: 'resources',
                foreignField: '_id',
                as: 'resources',
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user',
            }
        },
        {
            $project: { "_id": 0, "resources.category": 0, "resources.avialable": 0, "resources.features": 0, "resources.description": 0, "resources.user": 0, "user.password": 0, "user.adminRole": 0, "user.admitted": 0, "user.bornDate": 0, "user.score": 0, "user.career": 0, "user.cvlac": 0, "user.student": 0, "user.semester": 0 }
        }
    ]);
    query.exec(function (err, requests) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
        } else {
            if (!requests) {
                res.status(404).send({ message: "No se encontrarón préstamos" });
            } else {
                res.status(200).send({ requests });
            }
        }
    });
}

// Funcion que elimina una solicitud
function remove(req, res) {
    var idUser = req.body.user;
    var idUResource = req.body.resource;
    RequestLoan.findOneAndRemove({ user: idUser, resource: idUResource }, function (err, deletedRequest) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
        } else {
            if (!deletedRequest) {
                res.status(404).send({ message: "No se encontró la solicitud de préstamo" });
            } else {
                res.status(200).send({ request: deletedRequest });
            }
        }
    });
}

module.exports = {
    register,
    remove,
    getReqPerUser
}