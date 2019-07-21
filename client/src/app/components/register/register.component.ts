import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

// Componentes y Modelos propios
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { Utilities } from '../../services/utilities';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Variable en la que se almacena los datos ingresados
  private user: User;

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


  constructor(private dialog: MatDialog, private userService: UserService, private router: Router) {
    this.cleanFormData();
  }


  // Método para limpiar datos de control de formulario
  private cleanFormData() {
    this.hidePassword = true;
    this.user = new User("", "", "", "", "", "", "", 0, false, "", "", 0, false, false);
    this.hideAuxPassword = true;
    this.auxPassword = "";
    this.msgError = "";
    this.dateControl = new FormControl();
    this.dateControl.disable();
    this.minDate = new Date(new Date().getFullYear() - 70, 0, 1);
    this.maxDate = new Date(new Date().getFullYear() - 15, 0, 1);
  }

  ngOnInit() {
  }

  // Método para validar los datos ingresados por el usuario
  validData() {
    var valid: boolean = false;
    if (this.user.name.length > 0 && this.user.surname.length > 0 && this.user.email.length > 0 && this.user.password.length > 0 && this.auxPassword.length > 0 && this.user.career.length != 0 && this.dateControl.value != null) {
      valid = this.user.password == this.auxPassword;
      this.msgError = valid ? "" : this.msgError = "Error: Las contraseñas no coinciden";
    } else {
      this.msgError = "Error: Todos los campos son obligatorios";
    }
    return valid;
  }

  // Método para registrar la solicitud
  register() {
    if (this.validData()) {
      this.user.bornDate = Utilities.parseDateToString(this.dateControl.value, '-');
      this.userService.register(this.user).subscribe(
        response => {
          this.user = (<any>response).user;
          if (!this.user._id) {
            this.msgError = "Error al registrarse, intente de nuevo";
          } else {
            this.openDialog();
          }
        },
        error => {
          let err = <any>error;
          if (err != null) {
            this.msgError = err.error.message;
          }
        }
      );
    }
  }

  // Método para abrir dialogo de información exitosa
  openDialog() {
    var info: Information = { title: "Solicitud Enviada", message: "El semillero revisará la solicitud en los proximos días y se notificará la respuesta al correo electronico " + this.user.email };
    this.dialog.open(InfoDialogComponent, { data: info }).beforeClosed().subscribe(result => {
      this.router.navigateByUrl("/home");
      this.cleanFormData();
    });
  }

}