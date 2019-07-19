'use strict'

var express = require('express');
var noticeController = require('../controllers/notice');

var api = express.Router();

api.post('/notice', noticeController.register);
api.get('/notices', noticeController.getNotices);
api.put('/update-notice/:id', noticeController.update);
api.delete('/delete-notice/:id', noticeController.remove);

module.exports = api;