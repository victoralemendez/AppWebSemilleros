'use strict'

var express = require('express');
var loanController = require('../controllers/loan');

var api = express.Router();

api.post('/loan', loanController.register);

module.exports = api;