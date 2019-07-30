'use strict'

var express = require('express');
var contactController = require('../controllers/info-contact');

var api = express.Router();

api.post('/contact', contactController.register);
api.put('/update-contact/:id', contactController.update);
api.delete('/delete-contact/:id', contactController.remove);
api.get('/contacts', contactController.getInfoContacts);

module.exports = api;