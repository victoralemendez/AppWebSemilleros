'use strict'

var Contact = require('../models/info-contact');

// Funcion encargada de crear un item de contacto a partir de parametros JSON
function createContact(params) {
    var contact = new Contact();
    contact.title = params.title;
    contact.text = params.text;
    return contact;
}

// Funcion encargada de almacenar un item de contacto en la base de datos
function register(req, res) {
    var params = req.body;
    var contact = createContact(params);
    contact.save(function (err, storedContact) {
        if (err) {
            res.status(500).send({ message: "ocurrió un error interno al guardar la información de contacto, comuniquese con el administrador" });
        } else {
            if (!storedContact) {
                res.status(404).send({ message: "ocurrió un error, no se encontró registro de información de contacto" });
            } else {
                res.status(201).send({ contact: storedContact });
            }
        }
    });
}

// Funcion encargada de actualizar un documento de contacto
function update(req, res) {
    var contactId = req.params.id;
    var contact = req.body;
    Contact.findByIdAndUpdate(contactId, contact, function (err, updatedContact) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error al guardar la información de contacto, comuniquese con el administrador del sistema" });
        } else {
            if (!updatedContact) {
                res.status(404).send({ message: "No se encontró registro de información de contacto" });
            } else {
                res.status(200).send({ contact: updatedContact });
            }
        }
    });
}

// Funcion encargada de eliminar un documento de contacto
function remove(req, res) {
    Contact.findByIdAndDelete(req.params.id, function (err, deletedContact) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (!deletedContact) {
                res.status(404).send({ message: "No se encontró información de contacto" });
            } else {
                res.status(200).send({ contact: deletedContact });
            }
        }
    });
}

// Funcion encargada de recuperar todos los documentos de contacto
function getInfoContacts(req, res) {
    var query = Contact.find({}, function (err, contacts) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error al acceder a la información, comuniquese con el administrador del sistema" });
        } else {
            if (!contacts) {
                res.status(404).send({ message: "No se encontró registros de contacto" });
            } else {
                res.status(201).send({ contacts });
            }
        }
    });
}


module.exports = {
    register,
    update,
    remove,
    getInfoContacts
}