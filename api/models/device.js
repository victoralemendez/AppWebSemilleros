'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = Schema({
  name: String,
  description: String,
  image: String,
  avialable: Boolean,
  reference: String,
  features: String,
  //Aqui falta referencia de categoría
  //Aqui falta referencia de manual
});

module.exports = mongoose.model('Device', deviceSchema);
