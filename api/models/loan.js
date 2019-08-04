'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loanSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    resources: [Schema.Types.Mixed],
    dateStart: String,
    dateEnd: String,
    details: String,
    lender: String,
    image: String
});

module.exports = mongoose.model('Loan', loanSchema);