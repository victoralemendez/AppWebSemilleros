'use strict'

var Resource = require('../models/resource');

var fileSys = require('fs');
var path = require('path');

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/resources/images/";

// Funcion que crea un dispositivo con los parametros recibidos en una solicitud
function createResource(params) {
  var resource = new Resource();
  resource.name = params.name;
  resource.description = params.description;
  resource.image = 'null';
  resource.avialable = params.avialable;
  resource.features = params.features;
  resource.reference = params.reference;
  resource.category = params.category._id;
  return resource;
}


// Funcion para almacenar una imagen a un recurso
function uploadImage(req, res) {
  var resourceId = req.params.id;
  var fileName = 'No subido';
  if (req.files) {
    var filePath = req.files.image.path;
    var fileSplit = filePath.split('/');
    var fileName = fileSplit[3]; // 3 dado que [1] = courses, [2] = images  entonces ruta : resources/images/
    var extSplit = fileName.split('\.');
    var fileExt = extSplit[1];
    if (fileExt == 'png' || fileExt == 'jpg') {
      Resource.findByIdAndUpdate(resourceId, { image: fileName }, (err, updatedResource) => {
        if (!updatedResource) {
          res.status.send({ message: 'No se pudo actualizar el recurso' });
        } else {
          res.status(200).send({ resource: updatedResource, image: fileName });
        }
      });
    } else {
      res.status(409).send({ message: 'Extensión del archivo no válido' });
    }
  } else {
    res.status(404).send({ message: 'No se ha subido ninguna imagen' });
  }
}

// Funcion que retorna la imagen de un recurso especificp
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



// Funcion que almacena un dispositivo
function register(req, res) {
  var params = req.body;
  var resource = createResource(params);
  resource.save(function (err, storedResource) {
    if (err) {
      res.ststaus(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
    } else {
      if (!storedResource) {
        res.status(500).send({ message: "Ocurrió un error al guardar el recurso, comuniquese con el Administrador" });
      } else {
        res.status(201).send({ resource: storedResource });
      }
    }
  });
}

// Funcion que actualiza un recurso
function update(req, res) {
  var resourceId = req.params.id;
  var resource = req.body;
  Resource.findByIdAndUpdate(resourceId, resource, function (err, updatedResource) {
    if (err) {
      res.status(500).send({ message: "Error al actualizar el recurso, comuniquese con el Administrador" });
    } else {
      if (!updatedResource) {
        res.status(404).send({ message: "No se encontró el recurso" });
      } else {
        res.status(200).send({ resource: updatedResource });
      }
    }
  });
}

// Funcion que retorna todos los dispositivos
function getResources(req, res) {
  var find = Resource.find({});
  find.populate({ path: 'category' }).exec(function (err, resources) {
    if (err) {
      res.ststaus(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
    } else {
      if (!resources) {
        res.status(404).send({ message: "Error: No se encontraron recursos" });
      } else {
        res.status(200).send({ resources });
      }
    }
  });
}

// Funcion que retorna los dispositivos asociados a una categoria
function getResourcesCategory(req, res) {
  var idCategory = req.params.id;
  Resource.find({ category: idCategory, avialable: true }, function (err, resources) {
    if (err) {
      res.ststaus(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
    } else {
      if (!resources) {
        res.status(404).send({ message: "Error: No se encontraron recursos" });
      } else {
        res.status(200).send({ resources });
      }
    }
  });
}

module.exports = {
  register,
  update,
  getResources,
  getResourcesCategory,
  getImage,
  getResources,
  uploadImage
}
