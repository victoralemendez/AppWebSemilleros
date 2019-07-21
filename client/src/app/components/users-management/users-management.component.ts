import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Config, DataUserComponent } from '../data-user/data-user.component';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  private users: any[];

  constructor(private userService: UserService, private dialog: MatDialog, private router: Router) {
    this.users = [];
  }

  getInfoMessage() {
    return this.users == null || this.users.length == 0 ? "No hay solicitudes pendientes" : "Integrantes del semillero: " + this.users.length;
  }

  private showUsers() {
    this.userService.getUsers().subscribe(
      response => {
        this.users = (<any>response).users;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  getShortName(name, surname) {
    var names = name.split(' ');
    var surnames = surname.split(' ');
    return names[0] + " " + surnames[0];
  }

  private edit(user, index) {
    var userCloned = User.buildFromJSON(user);
    var config: Config = { admin: true, user: userCloned };
    this.dialog.open(DataUserComponent, { data: config }).afterClosed().subscribe(result => {
      if (result) {
        this.userService.update(userCloned).subscribe(
          response => {
            this.users[index] = userCloned;
            var info: Information = { title: "Integrante actualizado", message: "Los datos personales del integrante del semillero se actualizaron exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.validateAdminRole(userCloned);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  private getAdminRole(roleBoolean) {
    return roleBoolean ? "Si" : "No";
  }

  private delete(user) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación del integrante?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.userService.delete(user._id).subscribe(
          response => {
            this.showUsers();
            this.validateDeletedUser(user);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  validateAdminRole(user) {
    var identity = localStorage.getItem('identity');
    let json = JSON.parse(identity);
    if (json._id == user._id && !user.adminRole) {
      var info: Information = { title: "Lo sentimos", message: "Ya no eres administrador" };
      this.dialog.open(InfoDialogComponent, { data: info }).afterClosed().subscribe(result => {
        localStorage.setItem('identity', JSON.stringify(user));
        this.router.navigateByUrl('home');
      });
    }
  }

  validateDeletedUser(user) {
    var identity = localStorage.getItem('identity');
    let json = JSON.parse(identity);
    if (json._id == user._id) {
      var info: Information = { title: "Lo sentimos", message: "Ya no eres parte del semillero." };
      this.dialog.open(InfoDialogComponent, { data: info }).afterClosed().subscribe(result => {
        localStorage.setItem('identity', null);
        this.router.navigateByUrl('home');
      });
    }
  }

  ngOnInit() {
    this.showUsers();
  }

}
