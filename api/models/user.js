'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;  // Permite crear un objeto de tipo esquema el cual guarda documentos en una coleccion concreta

var user_schema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String,
    score: Number
});

module.exports = mongoose.model('User', user_schema); // Realiza el guardado en una coleccion llamada 'Users' (lo pluraliza)