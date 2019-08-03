'use strict'

var Loan = require('../models/loan');

// Funcion que crea un prestamo
function create(params) {
    var loan = new Loan();
    loan.resource = params.resource;
    loan.user = params.user;
    return loan;
}

// Funcion que almacena un prestamo en la base de datos
function register(req, res) {
    var loan = create(req.body);
    Loan.findOne({ user: loan.user, resource: loan.resource }, function (err, foundLoan) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (foundLoan) {
                res.status(409).send({ message: "Ya se encuentra una solicitud realizada para este dispositivo" });
            } else {
                store(res, loan);
            }
        }
    });
}

function store(res, loan) {
    loan.save(function (err, storedLoan) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (!storedLoan) {
                res.status(500).send({ message: "Ocurrió un error al guardar el préstamo, comuniquese con el Administrador" });
            } else {
                res.status(201).send({ loan: storedLoan });
            }
        }
    });
}


module.exports = {
    register
}