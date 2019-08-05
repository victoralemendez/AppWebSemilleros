'use strict'

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/events/";

var express = require('express');
var eventController = require('../controllers/event');
var multipart = require('connect-multiparty');
var mdUploadImages = multipart({ uploadDir: uploadImagesPath });

var api = express.Router();

api.post('/event', eventController.register);
api.get('/events', eventController.getEvents);
api.put('/update-event/:id', eventController.update);
api.delete('/delete-event/:id', eventController.remove);
api.post('/upload-image-event/:id', [mdUploadImages], eventController.uploadImage);
api.get('/get-image-event/:imageFile', eventController.getImage);

module.exports = api;