'use strict'

var News = require('../models/news');

// Funcion que crea una Noticia
function createNews(params) {
    var newNews = new News();
    newNews.name = params.name;
    newNews.description = params.description;
    newNews.image = 'null';
    return newNews;
}

// Funcion que almacena una Noticia
function register(req, res) {
    var params = req.body;
    var newNews = createNews(params);
    newNews.save(function (err, newsStored) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (!newsStored) {
                res.status(500).send({ message: "Ocurrió un error al guardar la noticia, comuniquese con el Administrador" });
            } else {
                res.status(201).send({ news: newsStored });
            }
        }
    });
}

function update(req, res) {
    var newsId = req.params.id;
    var news = req.body;
    News.findByIdAndUpdate(newsId, news, function (err, newsUpdated) {
        if (err) {
            res.status(500).send({ message: "Error al actualizar la noticia, comuniquese con el Administrador" });
        } else {
            if (!newsUpdated) {
                res.status(404).send({ message: "No se encontro la noticia" });
            } else {
                res.status(200).send({ news: newsUpdated });
            }
        }
    });
}

function remove(req, res) {
    var newsId = req.params.id;
    News.findByIdAndDelete(newsId, function (err, newsDeleted) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar la noticia, comuniquese con el Administrador" });
        } else {
            if (!newsDeleted) {
                res.status(404).send({ message: "No se encontro la noticia" });
            } else {
                res.status(200).send({ news: newsDeleted });
            }
        }
    });
}

// Funcion que devuelve todos las noticias
function getNews(req, res) {
    News.find({}, function (err, news) {
        if (err) {
            res.status(200).send({ message: "Ocurrió un error interno, comuniquese con el administrador" });
        } else {
            if (!news) {
                res.status(404).send({ message: "No se encontraron noticias" });
            } else {
                res.status(200).send({ news });
            }
        }
    });
}

module.exports = {
    register,
    getNews,
    update,
    remove
}