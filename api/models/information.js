'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var informationSchema = Schema({
    name: String,
    text: String,
    position: Number
});

module.exports = mongoose.model('Information', informationSchema);