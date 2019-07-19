'use strict'

var express = require('express');
var messageController = require('../controllers/message');

var api = express.Router();

api.post('/message', messageController.save);
api.get('/messages', messageController.getMessages);
api.put('/update-message/:id', messageController.update);
api.delete('/delete-message/:id', messageController.remove);

module.exports = api;
