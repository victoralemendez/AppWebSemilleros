import { Component, Inject } from '@angular/core';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { Device } from '../../models/device';

@Component({
  selector: 'app-data-device',
  templateUrl: './data-device.component.html',
  styleUrls: ['./data-device.component.css']
})
export class DataDeviceComponent {

  // Variable para mostrar mensaje de error
  private msgError: String;

  // Variables para controlar la cantidad de caracteres por campo
  private length: Number;

  constructor(@Inject(MAT_DIALOG_DATA) public device: Device, private dialog: MatDialogRef<any>) {
    this.msgError = '';
    this.length = 500;
  }

  // Funcion para validar el llenado de campos
  validData(): boolean {
    return this.device.name.length > 0 && this.device.description.length > 0 && this.device.features.length > 0  && this.device.reference.length > 0;
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
