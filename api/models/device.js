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
  category: {type : Schema.ObjectId, ref: 'Category'}
  //Aqui falta referencia de manual
});

module.exports = mongoose.model('Device', deviceSchema);
  