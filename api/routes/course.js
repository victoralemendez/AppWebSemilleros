'use strict'

var express = require('express');
var courseController = require('../controllers/course');

var api = express.Router();

api.post('/course', courseController.register);
api.get('/courses', courseController.getCourses);
api.put('/update-course/:id', courseController.update);
api.delete('/delete-course/:id', courseController.remove);

module.exports = api;
