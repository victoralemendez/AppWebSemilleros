'use strict'

var express = require('express');
var loanController = require('../controllers/loan');

var api = express.Router();

api.post('/loan', loanController.register);
api.put('/update-loan/:id', loanController.update);
api.get('/active-loans', loanController.getActiveLoans);

module.exports = api;