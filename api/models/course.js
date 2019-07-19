'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = Schema({
    name: String,
    description: String,
    duration: String,
    link: String,
    score: Number,
    startDate: String,
    endDate: String,
    image: String
});

module.exports = mongoose.model('Course', courseSchema);