'use strict'

var express = require('express');
var categoryController = require('../controllers/category');

var api = express.Router();

api.post('/category', categoryController.register);
api.get('/main-categories', categoryController.getMainCategories);
api.get('/sub-categories/:id', categoryController.getSubCategories);
api.put('/category/:id', categoryController.update);


module.exports = api;
