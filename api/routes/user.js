'use strict'

var express = require('express');
var user_controller = require('../controllers/user');
var multipart = require('connect-multiparty');


var api = express.Router();

api.post('/login', user_controller.login_user);
api.post('/register', user_controller.save_user);

module.exports = api;