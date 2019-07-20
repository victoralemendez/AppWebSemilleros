'use strict'

var Category = require('../models/category');

// Funcion encargada de crear el prototipo que se almacenará en la base de datos
function createCourse(params) {
  var category = new Category();
  category.name = params.name;
  category.description = params.description;
  category.parentCategory = params._idParent;
  category.position = params.position;
  return category;
}

// Funcion encargada de almacenar una categoria en la base de datos
function register(req, res) {
  var newCategory = build(req.body);
  newCategory.save(function(err, categoryStored) {
    if (err) {
      res.status(500).send({ message : "Ocurrió un error interno, comuniquese con el servidor"});
    } else {
      if (!categoryStored) {
        res.status(500).send({message : "Ocurrió un error al guardar la categoria, comuniquese con el administrador"});
      } else {
        res.status(201).send({ category : categoryStored });
      }
    }
  });
}

function update(req, res) {
  var categoryId = req.params.id;
  var category = req.body;
  Category.findByIdAndUpdate(categoryId, category, function(err, categoryUpdated) {
    if (err) {
      res.status(500).send({ message: "Error al actualizar la categoria, comuniquese con el Administrador" });
    } else {
      if (!categoryUpdated) {
        res.status(404).send({ message: "No se encontro la categoría" });
      } else {
        res.status(200).send({ category: categoryUpdated });
      }
    }
  });

}

// Funcion encargada de acceder a las categorias principales en la base de datos
function getMainCategories(req, res) {
  var find = Category.find({ parentCategory: null }).sort('position');
  find.exec(function(err, categories) {
    if (err) {
      res.status(500).send({ message : "Ocurrió un error interno, comuniquese con el servidor"});
    } else {
      if (!categories) {
        res.status(404).send({message : "No hay categorias registradas"});
      } else {
        res.status(200).send({ categories });
      }
    }
  });
}

// Funcion encargada de acceder a subcategorias especificas en la base de datos
function getSubCategories(req, res) {
  var find = Category.find({parentCategory : req.params.id}).sort('position');
  find.exec(function(err, categories) {
    if (err) {
      res.status(500).send({ message : "Ocurrió un error interno, comuniquese con el servidor" });
    } else {
      if (!categories) {
        res.status(404).send({ message : "No hay categorias subregistradas" });
      } else {
        res.status(200).send({ categories });
      }
    }
  });
}

module.exports = {
  register,
  getMainCategories,
  getSubCategories,
  update
}
