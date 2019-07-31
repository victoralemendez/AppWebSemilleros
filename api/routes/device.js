'use strict'

var express = require('express');
var deviceController = require('../controllers/device');

var api = express.Router();

api.post('/device', deviceController.register);
api.get('/devices', deviceController.getDevices);
api.get('/devices-category/:id', deviceController.getDevicesCategory);
api.put('/device/:id', deviceController.update);

module.exports = api;
