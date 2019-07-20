'use strict'

var Course = require('../models/course');

// Funcion que crea un Curso
function createCourse(params) {
    var newCourse = new Course();
    newCourse.name = params.name;
    newCourse.description = params.description;
    newCourse.link = params.link;
    newCourse.image = 'null';
    newCourse.startDate = params.startDate;
    newCourse.endDate = params.endDate;
    newCourse.score = params.score;
    return newCourse;
}

// Funcion que almacena un curso
function register(req, res) {
    var params = req.body;
    var newCourse = createCourse(params);
    newCourse.save(function(err, courseStored) {
        if (err) {
            res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el Administrador" });
        } else {
            if (!courseStored) {
                res.status(500).send({ message: "Ocurrió un error al guardar el curso, comuniquese con el Administrador" });
            } else {
                res.status(201).send({ course: courseStored });
            }
        }
    });
}

function update(req, res) {
    var courseId = req.params.id;
    var course = req.body;
    Course.findByIdAndUpdate(courseId, course, function(err, courseUpdated) {
        if (err) {
            res.status(500).send({ message: "Error al actualizar el curso, comuniquese con el Administrador" });
        } else {
            if (!courseUpdated) {
                res.status(404).send({ message: "No se encontro el curso" });
            } else {
                res.status(200).send({ course: courseUpdated });
            }
        }
    });
}

function remove(req, res) {
    var courseId = req.params.id;
    Course.findByIdAndDelete(courseId, function(err, courseDeleted) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar el curso, comuniquese con el Administrador" });
        } else {
            if (!courseDeleted) {
                res.status(404).send({ message: "No se encontro el curso" });
            } else {
                res.status(200).send({ course: courseDeleted });
            }
        }
    });
}

// Funcion que devuelve todos los cursos
function getCourses(req, res) {
    Course.find({}, function(err, courses) {
        if (err) {
            res.status(200).send({message: "Ocurrió un error interno, comuniquese con el administrador"});
        } else {
            if (!courses) {
                res.status(404).send({message: "No se encontraron cursos"});
            } else {
                res.status(200).send({courses});
            }
        }
    });
}

module.exports = {
    register,
    getCourses,
    update,
    remove
}
