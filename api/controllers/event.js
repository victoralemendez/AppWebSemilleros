'use strict'

var Event = require('../models/event');

// Funcion que crea un event
function build(params) {
    var newEvent = new Event();
    newEvent.name = params.name;
    newEvent.description = params.description;
    newEvent.image = 'null';
    newEvent.startDate = params.startDate;
    return newEvent;
}

// Funcion que almacena un evento
function register(req, res) {
    var params = req.body;
    var newEvent = build(params);
    newEvent.save(function(err, eventStored) {
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
    Event.findByIdAndUpdate(EventId, event, function(err, eventUpdated) {
        if (err) {
            res.status(500).send({ message: "Error al actualizar el event, comuniquese con el Administrador" });
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
    Event.findByIdAndDelete(eventId, function(err, eventDeleted) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar el event, comuniquese con el Administrador" });
        } else {
            if (!eventDeleted) {
                res.status(404).send({ message: "No se encontro el event" });
            } else {
                res.status(200).send({ event: eventDeleted });
            }
        }
    });
}

// Funcion que devuelve todos los events
function getEvents(req, res) {
    Event.find({}, function(err, events) {
        if (err) {
            res.status(200).send({message: "Ocurrió un error interno, comuniquese con el administrador"});
        } else {
            if (!events) {
                res.status(404).send({message: "No se encontraron el evento"});
            } else {
                res.status(200).send({events});
            }
        }
    });
}

module.exports = {
    register,
    getEvents,
    update,
    remove
}