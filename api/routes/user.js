'use strict'

var express = require('express');
var userController = require('../controllers/user');
var multipart = require('connect-multiparty');


var api = express.Router();

api.post('/login', userController.login);
api.post('/register-user', userController.register);
api.get('/requests', userController.getUsersNotActivated);
api.get('/users', userController.getUsersActivated);
api.put('/update-user/:id', userController.update);
api.delete('/delete-user/:id', userController.remove);

module.exports = api;