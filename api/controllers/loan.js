'use strict'

var Loan = require('../models/loan');

// Funcion que crea un prestamo con los parametros recibidos en una solicitud
function createLoan(params) {
    var loan = new Loan();
    loan.user = params.user;
    loan.resources = params.resources;
    loan.dateStart = params.dateStart;
    loan.dateEnd = params.dateEnd;
    loan.note = params.note;
    loan.lender = params.lender;
    loan.image = params.image;
    return loan;
}

// Funcion que almacena un prestamo
function register(req, res) {
    var params = req.body;
    var loan = createLoan(params);
    loan.save(function (err, storedLoan) {
        if (err) {
            res.ststaus(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (!storedLoan) {
                res.status(500).send({ message: "Ocurrió un error al guardar el prestamo, comuniquese con el Administrador" });
            } else {
                res.status(201).send({ loan: storedLoan });
            }
        }
    });
}

// Funcion que actualiza un prestamo
function update(req, res) {
    var loanId = req.params.id;
    var loan = createLoan(req.body);
    Loan.findOneAndUpdate({ _id: loanId }, loan, function (err, updatedLoan) {
        if (err) {
            res.status(500).send({ message: "Error al actualizar el recurso, comuniquese con el Administrador" });
        } else {
            if (!updatedLoan) {
                res.status(404).send({ message: "No se encontró el prestamo" });
            } else {
                res.status(200).send({ loan: updatedLoan });
            }
        }
    });
}

// Funcion que retorna los prestamos activos
function getActiveLoans(req, res) {
    var loan = createLoan(req.body);
    Loan.find({ dateEnd: null }, function (err, loans) {
        if (err) {
            res.status(500).send({ message: "Error al actualizar el recurso, comuniquese con el Administrador" });
        } else {
            if (!loans) {
                res.status(404).send({ message: "No se encontraron préstamos" });
            } else {
                res.status(200).send({ loans });
            }
        }
    });
}

module.exports = {
    register,
    update,
    getActiveLoans
}