'use strict'

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/users/images";

// Ruta de almacenamiento de cvlacs
const uploadCvlacsPath = "./uploads/users/cvlacs";

var express = require('express');
var userController = require('../controllers/user');
var multipart = require('connect-multiparty');
var mdUploadImages = multipart({ uploadDir: uploadImagesPath });


var api = express.Router();

api.post('/login', userController.login);
api.post('/register-user', userController.register);
api.get('/requests', userController.getUsersNotActivated);
api.get('/users', userController.getUsersActivated);
api.put('/update-user/:id', userController.update);
api.delete('/delete-user/:id', userController.remove);
api.post('/upload-image-user/:id', [mdUploadImages], userController.uploadImage);
api.get('/get-image-user/:imageFile', userController.getImage);

module.exports = api;