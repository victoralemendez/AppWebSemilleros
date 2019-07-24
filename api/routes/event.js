'use strict'

var express = require('express');
var eventController = require('../controllers/event');

var api = express.Router();

api.post('/event', eventController.register);
api.get('/events', eventController.getEvents);
api.put('/update-event/:id', eventController.update);
api.delete('/delete-event/:id', eventController.remove);

module.exports = api;