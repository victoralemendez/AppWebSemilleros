'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = Schema({
  name: String,
  description: String,
  image: String,
  avialable: Boolean
});

module.exports = mongoose.model('Device', deviceSchema);
