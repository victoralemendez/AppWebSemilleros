'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({
  name: String,
  description: String,
  parentCategory: {type : Schema.ObjectId, ref: 'Category'},
  position: Number
});

module.exports = mongoose.model('Category', categorySchema);
