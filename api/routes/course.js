'use strict'

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/courses/images";


var express = require('express');
var courseController = require('../controllers/course');
var multipart = require('connect-multiparty');
var mdUploadImages = multipart({ uploadDir: uploadImagesPath });

var api = express.Router();

api.post('/course', courseController.register);
api.get('/courses', courseController.getCourses);
api.put('/update-course/:id', courseController.update);
api.delete('/delete-course/:id', courseController.remove);
api.post('/upload-image-course/:id', [mdUploadImages], courseController.uploadImage);
api.get('/get-image-course/:imageFile', courseController.getImage);

module.exports = api;
