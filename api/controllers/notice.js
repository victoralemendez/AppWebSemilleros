'use strict'

var Notice = require('../models/notice');

// Funcion que crea una Noticia
function build(params) {
    var newNotice = new Notice();
    newNotice.name = params.name;
    newNotice.description = params.description;
    newNotice.image = 'null';
    return newNotice;
}

// Funcion que almacena una Noticia
function register(req, res) {
    var params = req.body;
    var newNotice = build(params);
    newNotice.save(function(err, noticeStored) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (!noticeStored) {
                res.status(500).send({ message: "Ocurrió un error al guardar la noticia, comuniquese con el Administrador" });
            } else {
                res.status(201).send({ notice: noticeStored });
            }
        }
    });
}

function update(req, res) {
    var noticeId = req.params.id;
    var notice = req.body;
    Notice.findByIdAndUpdate(noticeId, notice, function(err, noticeUpdated) {
        if (err) {
            res.status(500).send({ message: "Error al actualizar la noticia, comuniquese con el Administrador" });
        } else {
            if (!noticeUpdated) {
                res.status(404).send({ message: "No se encontro la noticia" });
            } else {
                res.status(200).send({ notice: noticeUpdated });
            }
        }
    });
}

function remove(req, res) {
    var noticeId = req.params.id;
    Notice.findByIdAndDelete(noticeId, function(err, noticeDeleted) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar la noticia, comuniquese con el Administrador" });
        } else {
            if (!noticeDeleted) {
                res.status(404).send({ message: "No se encontro la noticia" });
            } else {
                res.status(200).send({ notice: noticeDeleted });
            }
        }
    });
}

// Funcion que devuelve todos las noticias
function getNotices(req, res) {
    Notice.find({}, function(err, notices) {
        if (err) {
            res.status(200).send({message: "Ocurrió un error interno, comuniquese con el administrador"});
        } else {
            if (!notices) {
                res.status(404).send({message: "No se encontraron noticias"});
            } else {
                res.status(200).send({notices});
            }
        }
    });
}

module.exports = {
    register,
    getNotices,
    update,
    remove
}