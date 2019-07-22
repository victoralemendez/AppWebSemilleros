'use strict'

var express = require('express');
var newsController = require('../controllers/news');

var api = express.Router();

api.post('/news', newsController.register);
api.get('/newss', newsController.getNews);
api.put('/update-news/:id', newsController.update);
api.delete('/delete-news/:id', newsController.remove);

module.exports = api;