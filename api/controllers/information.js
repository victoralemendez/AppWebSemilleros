'use strict'

var Information = require('../models/information');

// Funcion encargada de crear un item de información a partir de parametros JSON
function createInfo(params) {
    var info = new Information();
    info.name = params.name;
    info.text = params.text;
    info.position = params.position;
    return info;
}

// Funcion encargada de almacenar un item de informacion en la base de datos
function register(req, res) {
    var params = req.body;
    var info = createInfo(params);
    info.save(function (err, storedInfo) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error al guardar la información, comuniquese con el administrador del sistema" });
        } else {
            if (!storedInfo) {
                res.status(404).send({ message: "No se encontró registro de información" });
            } else {
                res.status(201).send({ info: storedInfo });
            }
        }
    });
}

// Funcion encargada de actualizar un registro de informacion
function update(req, res) {
    var infoId = req.params.id;
    var info = req.body;
    Information.findByIdAndUpdate(infoId, info, function (err, updatedInfo) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error al guardar la información, comuniquese con el administrador del sistema" });
        } else {
            if (!updatedInfo) {
                res.status(404).send({ message: "No se encontró registro de información" });
            } else {
                res.status(200).send({ info: updatedInfo });
            }
        }
    });
}

// Funcion encargada de eliminar un item de informacion especifico
function remove(req, res) {
    Information.findByIdAndDelete(req.params.id, function(err, deletedInfo) {
      if (err) {
        res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
      } else {
        if (!deletedInfo) {
          res.status(404).send({ message: "No se encontró item de información" });
        } else {
          res.status(200).send({ info: deletedInfo });
        }
      }
    });
  }

// Funcion que envia todos los items de informacion
function getInformations(req, res) {
    var query = Information.find({}).sort('position');
    query.exec(function (err, informations) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error al acceder a la información, comuniquese con el administrador del sistema" });
        } else {
            if (!informations) {
                res.status(404).send({ message: "No se encontró registro de información" });
            } else {
                res.status(201).send({ informations });
            }
        }
    });
}

module.exports = {
    register,
    update,
    remove,
    getInformations
}
