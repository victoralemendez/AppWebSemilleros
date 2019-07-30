'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargado de rutas de controladores
var userRoutes = require('./routes/user');
var messageRoutes = require('./routes/message');
var courseRoutes = require('./routes/course');
var categoryRoutes = require('./routes/category');
var deviceRoutes = require('./routes/device');
var eventRoutes = require('./routes/event');
var newsRoutes = require('./routes/news');
var informationRoutes = require('./routes/information');
var contactRoutes = require('./routes/info-contact');


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
app.use('/api', userRoutes);
app.use('/api', messageRoutes);
app.use('/api', courseRoutes);
app.use('/api', categoryRoutes);
app.use('/api', deviceRoutes);
app.use('/api', newsRoutes);
app.use('/api', eventRoutes);
app.use('/api', informationRoutes);
app.use('/api', contactRoutes);


module.exports = app;