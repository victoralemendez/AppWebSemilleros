'use strict'

var express = require('express');
var courseController = require('../controllers/course');

var api = express.Router();

api.post('/course', courseController.create);
api.get('/courses', courseController.getCourses);
api.put('/update-course/:id', courseController.updateCourse);
api.delete('/delete-course/:id', courseController.deleteCourse);

module.exports = api;