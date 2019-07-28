import { Component, OnInit } from '@angular/core';

// Componentes de Angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { Information } from '../../models/information';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { InfoService } from '../../services/info.service';
import { DataInfoComponent } from '../data-info/data-info.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-info-management',
  templateUrl: './info-management.component.html',
  styleUrls: ['./info-management.component.css']
})
export class InfoManagementComponent implements OnInit {

  private informations: any[];
  private msgError: String;

  constructor(private infoService: InfoService, private dialog: MatDialog) {
    this.informations = [];
    this.msgError = "";
  }

  ngOnInit() {
    this.showInformations();
  }

  getInfo() {
    return this.informations == null || this.informations.length == 0 ? "No hay información registrada" : "Items de información registrada: " + this.informations.length;
  }

  dialogCreateInfo() {
    var info: Information = new Information("", "", "", this.informations.length + 1);
    this.dialog.open(DataInfoComponent, { data: info }).beforeClosed().subscribe(result => {
      if (result) {
        this.infoService.create(info).subscribe(
          response => {
            this.informations.push((<any>response).info);
          },
          error => {
            var info = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  dialogUpdateInfo(info, index) {
    var clone = Information.createFromJSON(info);
    this.dialog.open(DataInfoComponent, { data: clone }).beforeClosed().subscribe(result => {
      if (result) {
        this.infoService.update(clone).subscribe(
          response => {
            this.informations[index] = clone;
            var info = { title: "Información actualizada", message: "La información se actualizó exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
          },
          error => {
            var info = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  updatePositionUp(index) {
    var info1 = this.informations[index - 1];
    var info2 = this.informations[index];
    info1.position++;
    info2.position--;
    this.updateWithoutDialog(info1);
    this.updateWithoutDialog(info2);
  }

  updatePositionDown(index) {
    var info1 = this.informations[index + 1];
    var info2 = this.informations[index];
    info1.position--;
    info2.position++;
    this.updateWithoutDialog(info1);
    this.updateWithoutDialog(info2);
  }

  setIndexInfo() {
    for (let index = 0; index < this.informations.length; index++) {
      this.informations[index].position = (index + 1);
      this.updateWithoutDialog(this.informations[index]);
    }
  }

  updateWithoutDialog(info) {
    this.infoService.update(info).subscribe(
      response => {
        this.showInformations();
      },
      error => {
        let info = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  delete(info, index) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea eliminar la información?, la información será eliminada de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.infoService.delete(info._id).subscribe(
          response => {
            this.informations.splice(index, 1);
            this.setIndexInfo();
          },
          error => {
            var info = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          });
      }
    });
  }

  showInformations() {
    this.infoService.getInformations().subscribe(
      response => {
        this.informations = (<any>response).informations;
      },
      error => {
        this.msgError = (<any>error).error.message;
      }
    );
  }

}

