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

// Funcion encargada de actualizar un mensaje
function update(req, res) {
  var messageId = req.params.id;
  var message = req.body;
  Message.findByIdAndUpdate(messageId, message, function(err, messageUpdated) {
      if (err) {
          res.status(500).send({ message: "Ocurrió un error interno, intente de nuevo" });
      } else {
          if (!messageUpdated) {
              res.status(500).send({ message: "Ocurrió un error al actualizar el mensaje, intente de nuevo" });
          } else {
              res.status(201).send({ message: messageUpdated });
          }
      }
  });
}

// Funcion encargada de retornar los mensajes
function getMessages(req, res) {
  Message.find({}, function(err, messages) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
    } else {
      if (!messages) {
        res.status(404).send({ message: "No se encontraron mensajes" });
      } else {
        res.status(200).send({ messages });
      }
    }
  });
}

// Funcion encargada de eliminar un mensaje especcifico
function remove(req, res) {
  Message.findByIdAndDelete(req.params.id, function(err, messageDeleted) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
    } else {
      if (!messageDeleted) {
        res.status(404).send({ message: "No se encontró el mensaje" });
      } else {
        res.status(200).send({ message: messageDeleted });
      }
    }
  });
}

module.exports = {
    save,
    remove,
    update,
    getMessages
};
