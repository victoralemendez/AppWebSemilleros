'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loanSchema = Schema({
    resource: { type: Schema.ObjectId, ref: 'Resource' },
    user: { type: Schema.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Loan', loanSchema);