'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = Schema({
    name: String,
    description: String,
    link: String,
    score: Number,
    startDate: String,
    endDate: String,
    image: String
});

module.exports = mongoose.model('Event', eventSchema);