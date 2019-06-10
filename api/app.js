'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargado de rutas de controladores

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // Conviersion a JSON de los datos recibidos por peticiones HTTP


// Configuracion de cabeceras http
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas base


module.exports = app;
