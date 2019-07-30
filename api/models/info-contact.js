'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var infoContactSchema = Schema({
    title: String,
    text: String
});

module.exports = mongoose.model('Contact', infoContactSchema);