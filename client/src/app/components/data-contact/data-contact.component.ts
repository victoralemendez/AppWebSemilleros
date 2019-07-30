import { Component, Inject } from '@angular/core';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes y servicios propios
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-data-contact',
  templateUrl: './data-contact.component.html',
  styleUrls: ['./data-contact.component.css']
})
export class DataContactComponent {

  // Variable para mostrar mensaje de error
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) public contact: Contact, private dialog: MatDialogRef<any>) {
    this.msgError = '';
  }

  // Funcion para validar el llenado de campos
  validData(): boolean {
    return this.contact.title.length > 0 && this.contact.text.length > 0;
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
