'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceSchema = Schema({
  name: String,
  description: String,
  image: String,
  avialable: Boolean,
  reference: String,
  features: String,
  category: { type: Schema.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Resource', resourceSchema);
