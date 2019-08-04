import { Component, OnInit } from '@angular/core';

// Componentes de Angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { Resource } from '../../models/resource';
import { DataResourceComponent } from '../data-resource/data-resource.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-resources-management',
  templateUrl: './resources-management.component.html',
  styleUrls: ['./resources-management.component.css']
})
export class ResourcesManagementComponent implements OnInit {

  // Variable para gestionar los dispositivos
  private resources: any[];

  // Variable para controlar el máximo de caracteres a mostrar en la tarjeta
  private maxDescLength: number;

  // Variables para imprimir mensajes
  private msgError: String;

  constructor(public dialog: MatDialog, private resourceService: ResourceService) {
    this.resources = [];
    this.maxDescLength = 80;
  }

  ngOnInit() {
    this.showResources();
    this.msgError = "";
  }

  showResources() {
    this.resourceService.getResources().subscribe(
      response => {
        this.resources = (<any>response).resources;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  private getStringState(state) {
    return state ? "Disponible" : "No disponible";
  }

  // Funcion encargada de fijar el mensaje presentado al usuario
  private getInfo() {
    return this.resources.length == 0 ? "No hay recursos registrados" : "Número de recursos encontrados: " + this.resources.length;
  }

  // Funcion encargada de la respuesta del servidor al crear un curso
  create() {
    let resource: Resource = new Resource("", "", "", false, "", "", { _id: null, name: "" }, "");
    this.dialog.open(DataResourceComponent, { data: resource }).beforeClosed().subscribe(result => {
      if (result) {
        this.resourceService.create(resource).subscribe(
          response => {
            var info: Information = { title: "Recurso creado", message: "El recurso se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.showResources();
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  // Funcion encargada de calcular el número de caracteres a mostrar en la descripción del dispositivo (solo para la vista en el modelo de tarjetas)
  getShortDescription(description) {
    var shortDescrip = description;
    if (description.length > this.maxDescLength) {
      shortDescrip = description.substr(0, this.maxDescLength) + " ...";
    }
    return shortDescrip;
  }

  // Funcion encargada de la respuesta del servidor al modificar un curso
  update(json: any) {
    var resourceCloned: Resource = new Resource(json._id, json.name, json.description, json.avialable, json.reference, json.features, json.category, json.image);
    this.dialog.open(DataResourceComponent, { data: resourceCloned }).beforeClosed().subscribe(result => {
      if (result) {
        this.resourceService.update(resourceCloned).subscribe(
          response => {
            this.showResources();
            var info: Information = { title: "Recurso actualizado", message: "El recurso se actualizó exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

}
