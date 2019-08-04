'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestLoanSchema = Schema({
    resource: { type: Schema.ObjectId, ref: 'Resource' },
    user: { type: Schema.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('RequestLoan', requestLoanSchema);