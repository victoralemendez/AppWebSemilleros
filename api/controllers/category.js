'use strict'

var Category = require('../models/category');

/**
 * @description Funcion encargada de crear una nueva Categoria con el modelo de la base de datos
 * @param {JSON} params Datos de la categoria que son recibidas en una solicitud
 * @returns {Category} Retorna la nueva categoria creada
 */
function createCategory(params) {
  var category = new Category();
  category.name = params.name;
  category.description = params.description;
  category.parentCategory = params._idParent;
  category.position = params.position;
  category.avialable = params.avialable;
  return category;
}

// Funcion encargada de almacenar una categoria en la base de datos
function register(req, res) {
  var newCategory = createCategory(req.body);
  newCategory.save(function (err, categoryStored) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
    } else {
      if (!categoryStored) {
        res.status(500).send({ message: "Ocurrió un error al guardar la categoria, comuniquese con el administrador" });
      } else {
        res.status(201).send({ category: categoryStored });
      }
    }
  });
}

// Funcion que retorna id y nombre de las categorias finales
function getFinalCategories(req, res) {
  var query = Category.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: 'parentCategory',
        as: 'children'
      }
    },
    { $match: { 'children.0': { $exists: false } } },
    { $project: { '_id': 1, 'name': 1 } }
  ]);
  query.exec(function (err, categories) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
    } else {
      if (!categories) {
        res.status(404).send({ message: "No se encontrarón subcategorias" });
      } else {
        res.status(200).send({ categories });
      }
    }
  });
}

// Funcion encargada de actualizar un registro de categoria
function update(req, res) {
  var categoryId = req.params.id;
  var category = req.body;
  Category.findByIdAndUpdate(categoryId, category, function (err, categoryUpdated) {
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
  find.exec(function (err, categories) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
    } else {
      if (!categories) {
        res.status(404).send({ message: "No hay categorias registradas" });
      } else {
        res.status(200).send({ categories });
      }
    }
  });
}

// Funcion encargada de acceder a subcategorias especificas en la base de datos
function getSubCategories(req, res) {
  var find = Category.find({ parentCategory: req.params.id }).sort('position');
  find.exec(function (err, categories) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
    } else {
      if (!categories) {
        res.status(404).send({ message: "No hay categorias subregistradas" });
      } else {
        res.status(200).send({ categories });
      }
    }
  });
}

// Funcion encargada de recuperar categorias principales, solo recupero el id y nombre
function getSimpleMainCategories(req, res) {
  var find = Category.find({ parentCategory: null, avialable: true }, '_id name').sort('position');
  find.exec(function (err, categories) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
    } else {
      if (!categories) {
        res.status(404).send({ message: "No hay categorias registradas" });
      } else {
        res.status(200).send({ categories });
      }
    }
  });
}

// Funcion encargada de recuperar categorias principales, solo recupero el id y nombre
function getSimpleSubCategories(req, res) {
  var id = req.params.id;
  var find = Category.find({ parentCategory: id, avialable: true }, '_id name').sort('position');
  find.exec(function (err, categories) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
    } else {
      if (!categories) {
        res.status(404).send({ message: "No hay categorias registradas" });
      } else {
        res.status(200).send({ categories });
      }
    }
  });
}


function getCategory(req, res) {
  var id = req.params.id;
  var find = Category.findOne({ _id: id }, '_id name description');
  find.exec(function (err, category) {
    if (err) {
      res.status(500).send({ message: "Ocurrió un error interno, comuniquese con el servidor" });
    } else {
      if (!category) {
        res.status(404).send({ message: "No se encontró la categoria solicitada" });
      } else {
        res.status(200).send({ category });
      }
    }
  });
}

module.exports = {
  register,
  getMainCategories,
  getSubCategories,
  update,
  getFinalCategories,
  getSimpleMainCategories,
  getSimpleSubCategories,
  getCategory
}
