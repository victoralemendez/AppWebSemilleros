'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = Schema({
    fullname: String,
    email: String,
    phoneNumber: String,
    text: String,
    viewed: Boolean
});

module.exports = mongoose.model('Message', messageSchema);