'use strict'

var express = require('express');
var infoController = require('../controllers/information');

var api = express.Router();

api.post('/information', infoController.register);
api.put('/update-info/:id', infoController.update);
api.get('/informations', infoController.getInformations);
api.delete('/delete-info/:id', infoController.remove);

module.exports = api;