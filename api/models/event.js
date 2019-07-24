'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = Schema({
    name: String,
    description: String,
    score: Number,
    date: String,
    image: String
});

module.exports = mongoose.model('Event', eventSchema);