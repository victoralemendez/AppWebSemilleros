'use strict'

var Device = require('../models/device');

// Funcion que crea un dispositivo con los parametros recibidos en una solicitud
function createDevice(params) {
  var newDevice = new Device();
  newDevice.name = params.name;
  newDevice.description = params.description;
  newDevice.image = 'null';
  newDevice.avialable = params.avialable;
  newDevice.features = params.features;
  newDevice.reference = params.reference;
  newDevice.category = params.category._id;
  return newDevice;
}


// Funcion que almacena un dispositivo
function register(req, res) {
  var params = req.body;
  var newDevice = createDevice(params);
  newDevice.save(function (err, deviceStored) {
    if (err) {
      res.ststaus(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
    } else {
      if (!deviceStored) {
        res.status(500).send({ message: "Ocurrió un error al guardar el dispositivo, comuniquese con el Administrador" });
      } else {
        res.status(201).send({ device: deviceStored });
      }
    }
  });
}

function update(req, res) {
  var deviceId = req.params.id;
  var device = req.body;
  Device.findByIdAndUpdate(deviceId, device, function (err, deviceUpdated) {
    if (err) {
      res.status(500).send({ message: "Error al actualizar el dispositivo, comuniquese con el Administrador" });
    } else {
      if (!deviceUpdated) {
        res.status(404).send({ message: "No se encontro el dispositivo" });
      } else {
        res.status(200).send({ device: deviceUpdated });
      }
    }
  });
}

// Funcion que retorna todos los dispositivos
function getDevices(req, res) {
  var find = Device.find({});
  find.populate({ path: 'category' }).exec(function (err, devices) {
    if (err) {
      res.ststaus(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
    } else {
      if (!devices) {
        res.status(404).send({ message: "Error: No se encontraron dispositivos" });
      } else {
        res.status(200).send({ devices });
      }
    }
  });
}

// Funcion que retorna los dispositivos asociados a una categoria
function getDevicesCategory(req, res) {
  var idCategory = req.params.id;
  Device.find({ category: idCategory, avialable: true }, function (err, devices) {
    if (err) {
      res.ststaus(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
    } else {
      if (!devices) {
        res.status(404).send({ message: "Error: No se encontraron dispositivos" });
      } else {
        res.status(200).send({ devices });
      }
    }
  });
}

module.exports = {
  register,
  getDevices,
  update,
  getDevicesCategory
}
