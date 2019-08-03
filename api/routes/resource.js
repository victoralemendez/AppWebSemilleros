'use strict'

var express = require('express');
var resourceController = require('../controllers/resource');

var api = express.Router();

api.post('/resource', resourceController.register);
api.put('/resource/:id', resourceController.update);
api.get('/resources', resourceController.getResources);
api.get('/resources-category/:id', resourceController.getResourcesCategory);

module.exports = api;
