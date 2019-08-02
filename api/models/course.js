'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = Schema({
    name: String,
    description: String,
    link: String,
    score: Number,
    startDate: String,
    endDate: String,
    image: String,
    teacher: String,
    internalTeacher: Boolean
});

module.exports = mongoose.model('Course', courseSchema);