import { Component, Inject } from '@angular/core';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes y Servicios propios
import { Device } from '../../models/device';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-data-device',
  templateUrl: './data-device.component.html',
  styleUrls: ['./data-device.component.css']
})
export class DataDeviceComponent {

  // variable para controlar la seleccion de la categoria
  private selectedCategory: any;
  private indexCategory: Number;

  // Variable para mostrar mensaje de error
  private msgError: String;

  // Variables para controlar la cantidad de caracteres por campo
  private length: Number;

  // Variable para mostrar las categrias finales
  private categories: any[];


  constructor(@Inject(MAT_DIALOG_DATA) public device: Device, private dialog: MatDialogRef<any>, private categoryService: CategoryService) {
    console.log(this.device.category);
    this.msgError = '';
    this.length = 500;
    this.selectedCategory = this.device.category;
    this.indexCategory = -1;
    this.showCategories();
  }

  private showCategories() {
    this.categoryService.getFinalCategories().subscribe(
      response => {
        this.categories = (<any>response).categories;
      },
      error => {
        this.msgError = (<any>error).error.mesage;
      }
    );
  }

  // Funcion para validar el llenado de campos
  validData(): boolean {
    return this.device.name.length > 0 && this.device.description.length > 0 && this.device.features.length > 0 && this.device.reference.length > 0;
  }

  // Funcion para cerrar el dialogo
  closeDialog() {
    var close: boolean = false;
    if (this.validData()) {
      this.dialog.close(true);
    } else {
      this.msgError = 'Todos los campos son obligatorios';
    }
    return close;
  }

  selectCategory(index) {
    this.indexCategory = index;
    this.selectedCategory = this.categories[index];
    this.device.category = this.categories[index];
  }

}
