'use strict'

var Message = require('../models/message');

// Funcion que crea un mensaje con los parametros recibidos en una solicitud
function createMessage(params) {
    var newMessage = new Message();
    newMessage.fullname = params.fullname;
    newMessage.email = params.email;
    newMessage.phoneNumber = params.phoneNumber;
    newMessage.text = params.text;
    newMessage.viewed = false;
    return newMessage;
}

// Funcion encargada de almacenar los mensajes
function save(req, res) {
    var params = req.body;
    var newMessage = createMessage(params);
    newMessage.save((err, messageStored) => {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, intente de nuevo" });
        } else {
            if (!messageStored) {
                res.status(500).send({ message: "Ocurrió un error al guardar el mensaje, intente de nuevo" });
            } else {
                res.status(201).send({ message: "Gracias por comunicarte con el semilero, en los próximos días se enviará respuesta al correo " + newMessage.email +" o al telefono " + newMessage.phoneNumber });
            }
        }
    });
}

module.exports = {
    save
};