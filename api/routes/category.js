'use strict'

var express = require('express');
var categoryController = require('../controllers/category');

var api = express.Router();

api.post('/category', categoryController.register);
api.get('/main-categories', categoryController.getMainCategories);
api.get('/sub-categories/:id', categoryController.getSubCategories);
api.get('/final-categories', categoryController.getFinalCategories);
api.put('/category/:id', categoryController.update);
api.get('/simple-maincategories', categoryController.getSimpleMainCategories);
api.get('/simple-subcategories/:id', categoryController.getSimpleSubCategories);
api.get('/category/:id', categoryController.getCategory);

module.exports = api;
