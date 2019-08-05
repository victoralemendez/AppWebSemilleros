'use strict'

var Course = require('../models/course');

var fileSys = require('fs');
var path = require('path');

// Ruta de almacenamiento de imagenes
const uploadImagesPath = "./uploads/courses/images/";

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
    newCourse.teacher = params.teacher;
    newCourse.internalTeacher = params.internalTeacher;
    return newCourse;
}

// Funcion que almacena un curso
function register(req, res) {
    var params = req.body;
    var newCourse = createCourse(params);
    newCourse.save(function (err, courseStored) {
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

// Funcion para almacenar una imagen a un curso
function uploadImage(req, res) {
    var courseId = req.params.id;
    var fileName = 'No subido';
    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[3]; // 3 dado que [1] = courses, [2] = images  entonces ruta : courses/images/
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
            Course.findByIdAndUpdate(courseId, { image: fileName }, (err, updatedCourse) => {
                if (!updatedCourse) {
                    res.status(500).send({ message: 'No se pudo actualizar el curso' });
                } else {
                    res.status(200).send({ course: updatedCourse, image: fileName });
                }
            });
        } else {
            res.status(409).send({ message: 'Extensión del archivo no válido' });
        }
    } else {
        res.status(404).send({ message: 'No se ha subido ninguna imagen' });
    }
}

// Funcion que retorna la imagen de un curso especificp
function getImage(req, res) {
    var imageFile = req.params.imageFile;
    var pathFile = uploadImagesPath + imageFile;
    fileSys.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(404).send({ message: "No existe la imagen..." });
        }
    });
}

// Funcion que actualiza un curso
function update(req, res) {
    var courseId = req.params.id;
    var course = req.body;
    Course.findByIdAndUpdate(courseId, course, function (err, courseUpdated) {
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
    Course.findByIdAndDelete(courseId, function (err, courseDeleted) {
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
    Course.find({}, function (err, courses) {
        if (err) {
            res.status(200).send({ message: "Ocurrió un error interno, comuniquese con el administrador" });
        } else {
            if (!courses) {
                res.status(404).send({ message: "No se encontraron cursos" });
            } else {
                res.status(200).send({ courses });
            }
        }
    });
}

module.exports = {
    register,
    getCourses,
    update,
    remove,
    getImage,
    uploadImage
}
