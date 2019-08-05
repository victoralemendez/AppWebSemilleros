'use strict'

var Event = require('../models/event');

var fileSys = require('fs');
var path = require('path');

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/events/";

// Funcion que crea un event
function createEvent(params) {
    var newEvent = new Event();
    newEvent.name = params.name;
    newEvent.description = params.description;
    newEvent.score = params.score;
    newEvent.image = 'null';
    newEvent.date = params.date;
    return newEvent;
}

// Funcion que almacena un evento
function register(req, res) {
    var params = req.body;
    var newEvent = createEvent(params);
    newEvent.save(function (err, eventStored) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (!eventStored) {
                res.status(500).send({ message: "Ocurrió un error al guardar el evento, comuniquese con el Administrador" });
            } else {
                res.status(201).send({ event: eventStored });
            }
        }
    });
}

function update(req, res) {
    var EventId = req.params.id;
    var event = req.body;
    Event.findByIdAndUpdate(EventId, event, function (err, eventUpdated) {
        if (err) {
            res.status(500).send({ message: "Error al actualizar el evento, comuniquese con el Administrador" });
        } else {
            if (!eventUpdated) {
                res.status(404).send({ message: "No se encontro el evento" });
            } else {
                res.status(200).send({ event: eventUpdated });
            }
        }
    });
}

function remove(req, res) {
    var eventId = req.params.id;
    Event.findByIdAndDelete(eventId, function (err, eventDeleted) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar el evento, comuniquese con el Administrador" });
        } else {
            if (!eventDeleted) {
                res.status(404).send({ message: "No se encontro el evento" });
            } else {
                res.status(200).send({ event: eventDeleted });
            }
        }
    });
}

// Funcion que devuelve todos los events
function getEvents(req, res) {
    Event.find({}, function (err, events) {
        if (err) {
            res.status(200).send({ message: "Ocurrió un error interno, comuniquese con el administrador" });
        } else {
            if (!events) {
                res.status(404).send({ message: "No se encontraron el evento" });
            } else {
                res.status(200).send({ events });
            }
        }
    });
}

// Funcion para almacenar una imagen a un curso
function uploadImage(req, res) {
    var eventId = req.params.id;
    var fileName = 'No subido';
    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2]; // 3 dado que [1] = events, [2] = /  entonces ruta : events/
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
            Course.findByIdAndUpdate(eventId, { image: fileName }, (err, updatedEvent) => {
                if (!updatedEvent) {
                    res.status(500).send({ message: 'No se pudo actualizar el evento' });
                } else {
                    res.status(200).send({ event: updatedEvent, image: fileName });
                }
            });
        } else {
            res.status(409).send({ message: 'Extensión del archivo no válido' });
        }
    } else {
        res.status(404).send({ message: 'No se ha subido ninguna imagen' });
    }
}

// Funcion que retorna la imagen de un curso especificp
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


module.exports = {
    register,
    getEvents,
    update,
    remove,
    getImage,
    uploadImage
}