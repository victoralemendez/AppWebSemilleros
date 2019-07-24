'use strict'

var express = require('express');
var deviceController = require('../controllers/device');

var api = express.Router();

api.post('/device', deviceController.register);
api.get('/devices', deviceController.getDevices);
api.put('/device/:id', deviceController.update);
//api.get('/test', deviceController.test);

module.exports = api;
