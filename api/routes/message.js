'use strict'

var express = require('express');
var messageController = require('../controllers/message');

var api = express.Router();

api.post('/message', messageController.save);

module.exports = api;