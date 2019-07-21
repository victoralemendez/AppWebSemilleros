'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;  // Permite crear un objeto de tipo esquema el cual guarda documentos en una coleccion concreta

var userSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    adminRole: Boolean,
    admitted: Boolean,
    bornDate: String,
    image: String,
    score: Number,
    cvlac: String,
    career: String,
    student: Boolean,
    semester: Number,
});

module.exports = mongoose.model('User', userSchema); // Realiza el guardado en una coleccion llamada 'Users' (lo pluraliza)
