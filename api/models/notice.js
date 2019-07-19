'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noticeSchema = Schema({
    name: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Notice', noticeSchema);