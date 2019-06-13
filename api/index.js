'use strict'


var mongoose = require('mongoose');     // Modulo intermediario para trabajar con mongodb
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise; // Elimina mensajes de mongoose al ejecutar el servidor

// Conexion a la bd
mongoose.connect('mongodb://localhost:27017/semillero', {useNewUrlParser: true},(err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("la conexión con la base de datos está funcionando correctamente");
        app.listen(port, function() {
            console.log("Servidor del API Rest de semilleros escuchando en http://localhost:" + port);
        });
    }
});
