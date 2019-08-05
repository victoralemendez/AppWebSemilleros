'use strict'

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/news/";

var express = require('express');
var newsController = require('../controllers/news');
var multipart = require('connect-multiparty');
var mdUploadImages = multipart({ uploadDir: uploadImagesPath });

var api = express.Router();

api.post('/news', newsController.register);
api.get('/news', newsController.getNews);
api.put('/update-news/:id', newsController.update);
api.delete('/delete-news/:id', newsController.remove);
api.post('/upload-image-news/:id', [mdUploadImages], newsController.uploadImage);
api.get('/get-image-news/:imageFile', newsController.getImage);

module.exports = api;