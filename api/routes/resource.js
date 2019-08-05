'use strict'

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/resources/images";

var express = require('express');
var resourceController = require('../controllers/resource');
var multipart = require('connect-multiparty');
var mdUploadImages = multipart({ uploadDir: uploadImagesPath });

var api = express.Router();

api.post('/resource', resourceController.register);
api.put('/resource/:id', resourceController.update);
api.get('/resources', resourceController.getResources);
api.get('/resources-category/:id', resourceController.getResourcesCategory);
api.post('/upload-image-resource/:id', [mdUploadImages], resourceController.uploadImage);
api.get('/get-image-resource/:imageFile', resourceController.getImage);

module.exports = api;
