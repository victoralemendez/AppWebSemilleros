import { Component, OnInit } from '@angular/core';

// Componentes de Angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { Category } from '../../models/category';
import { DataCategoryComponent } from '../data-category/data-category.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.css']
})

// Componente encargado de la gestion de categorias
export class CategoriesManagementComponent implements OnInit {

  // Variable para gestionar las categorias
  private categories: any[];
  private categoriesGuide: any[];

  // Variable para seleccionar una categoria especifica
  private selectedCategory: any;

  // Variables para imprimir mensajes
  private title: String;

  constructor(public dialog: MatDialog, private categoryService: CategoryService) {
    this.categories = [];
    this.categoriesGuide = [];
    this.selectedCategory = null;
  }

  private getStringState(state) {
    return state ? "Disponible" : "No disponible";
  }

  private updateInfo() {
    return this.categories.length == 0 ? "No hay categorías registradas, para iniciar con el registro pulse el botón 'Agregar categoría'" : '';
  }

  private updateTitle() {
    return this.title = this.selectedCategory == null ? "Categorias principales" : this.selectedCategory.name;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.selectedCategory == null) {
      this.loadMainCategories();
    } else {
      this.showDataCategory(this.selectedCategory);
    }
  }

  // Funcion encargada de recibir respuesta del servidor al crear una categoria
  openCreate() {
    let idParent = this.selectedCategory != null ? this.selectedCategory._id : null;
    let newCategory: Category = new Category("", "", "", idParent, this.categories.length, true);
    this.dialog.open(DataCategoryComponent, { data: newCategory }).beforeClosed().subscribe(result => {
      if (result) {
        this.registerCategory(newCategory);
      }
    });
  }

  // Funcion encargada de procesar respuesta del servidor luego de crear una categoria
  registerCategory(category: Category) {
    this.categoryService.create(category).subscribe(
      response => {
        this.categories.push((<any>response).category);
        let info: Information = { title: "Categoria creada", message: "La categoría se ha creado exitosamente" };
        this.dialog.open(InfoDialogComponent, { data: info });
      },
      error => {
        let info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  // Funcion encargada de fijar el mensaje presentado al usuario
  private getInfo() {
    return this.categories.length == 0 ? "No hay categorias registradas" : "Número de categorias encontrados: " + this.categories.length;
  }

  // Funcion encargada de solicitar todas las categorias principales
  loadMainCategories() {
    this.categoryService.getMainCategories().subscribe(
      response => {
        this.categories = ((<any>response).categories);
        this.selectedCategory = null;
        this.categoriesGuide = [];
      },
      error => {
        let info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  selectCategoryGuide(index) {
    var category = this.categoriesGuide[index];
    this.selectedCategory = category;
    this.showDataCategory(category);
    this.categoriesGuide.splice(index, this.categoriesGuide.length);
  }

  selectCategory(index) {
    var category = this.categories[index];
    this.createCategoriesGuide();
    this.selectedCategory = category;
    this.showDataCategory(category);
  }

  createCategoriesGuide() {
    if (this.selectedCategory != null) {
      this.categoriesGuide.push(this.selectedCategory);
    }
  }

  showDataCategory(category: Category) {
    this.categoryService.getSubCategories(category._id).subscribe(
      response => {
        this.categories = ((<any>response).categories);
      },
      error => {
        let info: Information = { title: "Error", message: (<any>error).message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  openUpdate() {
    let clonedCategory: Category = new Category(this.selectedCategory._id, this.selectedCategory.name, this.selectedCategory.description, this.selectedCategory._idParent, this.selectedCategory.position, this.selectedCategory.avialable);
    this.dialog.open(DataCategoryComponent, { data: clonedCategory }).beforeClosed().subscribe(result => {
      if (result) {
        this.updateCategory(clonedCategory);
      }
    });
  }

  updateCategory(category) {
    this.categoryService.update(category).subscribe(
      response => {
        this.selectedCategory = category;
        let info: Information = { title: "Categoria actualizada", message: "La categoría se ha actualizado exitosamente" };
        this.dialog.open(InfoDialogComponent, { data: info });
      },
      error => {
        let info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  updatePositionUp(index) {
    var category = this.categories[index];
    var categoryUp = this.categories[index - 1];
    category.position--;
    categoryUp.position++;
    this.updateWithoutDialog(category);
    this.updateWithoutDialog(categoryUp);
  }

  updatePositionDown(index) {
    var category = this.categories[index];
    var categoryDown = this.categories[index + 1];
    category.position++;
    categoryDown.position--;
    this.updateWithoutDialog(category);
    this.updateWithoutDialog(categoryDown);
  }

  updateWithoutDialog(category) {
    this.categoryService.update(category).subscribe(
      response => {
        this.loadData();
      },
      error => {
        let info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

}
