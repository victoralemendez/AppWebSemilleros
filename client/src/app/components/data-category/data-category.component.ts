import { Component, Inject } from '@angular/core';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes y servicios propios
import { Category } from '../../models/category';

@Component({
  selector: 'app-data-category',
  templateUrl: './data-category.component.html',
  styleUrls: ['./data-category.component.css']
})
export class DataCategoryComponent {

  // Variable para mostrar mensaje de error
  private msgError: String;

  // Variables para controlar la cantidad de caracteres por campo
  private length: Number;

  constructor(@Inject(MAT_DIALOG_DATA) public category: Category, private dialog: MatDialogRef<any>) {
    this.msgError = '';
    this.length = 200;
  }

  ngOnInit() {
  }

  // Funcion para validar el llenado de campos
  validData(): boolean {
    return this.category.name.length > 0 && this.category.description.length > 0
  }
  // Funcion para cerrar el dialogo
  closeDialog() {
    var close: boolean = false;
    if (this.validData()) {
      this.dialog.close(true);
    } else {
      this.msgError = 'Todos los campos son obligatorios.';
    }
    return close;
  }

}
