'use strict'

var News = require('../models/news');

var fileSys = require('fs');
var path = require('path');

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/news/";

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

// Funcion para almacenar una imagen a una noticia
function uploadImage(req, res) {
    var newsId = req.params.id;
    var fileName = 'No subido';
    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2]; // 2 dado que [1] = news/, entonces ruta : news/
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
            News.findByIdAndUpdate(newsId, { image: fileName }, (err, updatedNews) => {
                if (!updatedNews) {
                    res.status(500).send({ message: 'No se pudo actualizar el la noticia' });
                } else {
                    res.status(200).send({ news: updatedNews, image: fileName });
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
    getNews,
    update,
    remove,
    getImage,
    uploadImage
}