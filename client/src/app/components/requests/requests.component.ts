import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { UserService } from '../../services/user.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  private requests: any[];

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadRequests();
  }

  getInfoMessage() {
    return this.requests == null || this.requests.length == 0 ? "No hay solicitudes pendientes" : "Solicitudes de ingreso al semillero: " + this.requests.length;
  }

  getShortName(name, surname) {
    var names = name.split(' ');
    var surnames = surname.split(' ');
    return names[0] + " " + surnames[0];
  }

  private loadRequests() {
    this.userService.getUsersNotAdmitted().subscribe(
      response => {
        this.requests = (<any>response).users;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  private accept(user, index) {
    user.admitted = true;
    this.userService.update(user).subscribe(
      response => {
        this.requests.splice(index, 1);
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  private refuse(user, index) {
    user.admitted = true;
    this.userService.delete(user._id).subscribe(
      response => {
        this.requests.splice(index, 1);
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

}
