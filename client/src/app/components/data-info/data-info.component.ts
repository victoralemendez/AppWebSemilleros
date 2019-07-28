import { Component, Inject } from '@angular/core';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { Information } from '../../models/information';

@Component({
  selector: 'app-data-info',
  templateUrl: './data-info.component.html',
  styleUrls: ['./data-info.component.css']
})
export class DataInfoComponent {

  // Variables para controlar la cantidad de caracteres por campo
  private lengthName: Number;
  private lengthText: Number;

  // Variable para mostrar mensaje de error
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) private info: Information, private dialog: MatDialogRef<any>) {
    this.lengthName = 20;
    this.lengthText = 1000;
    this.msgError = '';
  }

  // Funcion para validar el llenado de campos
  validData(): boolean {
    return this.info.name.length > 0 && this.info.text.length > 0;
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

}
