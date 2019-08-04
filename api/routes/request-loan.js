'use strict'

var express = require('express');
var loanReqController = require('../controllers/request-loan');

var api = express.Router();

api.post('/loan-request', loanReqController.register);
api.post('/delete-request/:id', loanReqController.remove);
api.get('/get-request-user', loanReqController.getReqPerUser);

module.exports = api;