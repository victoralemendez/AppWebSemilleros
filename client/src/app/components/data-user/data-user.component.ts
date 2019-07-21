import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

// Componentes de Angular Material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { Utilities } from '../../services/utilities';


@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.css']
})
export class DataUserComponent {

  // Variables para gestionar la visibilidad de las claves
  private hidePassword: boolean;
  private hideAuxPassword: boolean;

  // Variables para mostrar error presentados en los campos
  private msgError: String;

  // Varialble para validar la contrasenia
  private auxPassword: String;

  // Variable para asignar numero de semestres disponibles
  private semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Variable para capturar y acotar la fecha seleccionada
  private dateControl: FormControl;
  private minDate: Date;
  private maxDate: Date;


  constructor(@Inject(MAT_DIALOG_DATA) public config: Config, private dialog: MatDialogRef<any>) {
    this.hidePassword = true;
    this.hideAuxPassword = true;
    this.auxPassword = this.config.user.password;
    this.msgError = "";    
    this.dateControl = new FormControl(Utilities.parseStringToDate(this.config.user.bornDate, "-"));
    this.dateControl.disable();
    this.minDate = new Date(new Date().getFullYear() - 70, 0, 1);
    this.maxDate = new Date(new Date().getFullYear() - 15, 0, 1);
  }

  // Método para validar los datos ingresados por el usuario
  validData() {
    var valid: boolean = false;
    if (this.config.user.name.length > 0 && this.config.user.surname.length > 0 && this.config.user.email.length > 0 && this.config.user.password.length > 0 && this.auxPassword.length > 0 && this.config.user.career.length != 0 && this.dateControl.value != null) {
      valid = this.config.user.password == this.auxPassword;
      this.msgError = valid ? "" : this.msgError = "Error: Las contraseñas no coinciden";
    } else {
      this.msgError = "Error: Todos los campos son obligatorios";
    }
    return valid;
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

// interfaz requerida para enviar información
export interface Config {
  admin: Boolean,
  user: any
}
