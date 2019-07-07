'use strict'

var express = require('express');
var userController = require('../controllers/user');
var multipart = require('connect-multiparty');


var api = express.Router();

api.post('/login', userController.loginUser);
api.post('/register', userController.registerUser);
api.get('/requests', userController.getUsersNotActivated);
api.get('/users', userController.getUsersActivated);

module.exports = api;