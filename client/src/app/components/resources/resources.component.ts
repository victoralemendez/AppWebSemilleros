import { Component, OnInit, ViewChild } from '@angular/core';

// Componentes de Angular Material
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios proprios
import { DataInfoResourceComponent } from '../data-info-resource/data-info-resource.component';
import { ResourceService } from '../../services/resource.service';
import { CategoryService } from '../../services/category.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RequestLoan } from '../../models/request-loan';
import { LoanRequestService } from '../../services/loan-request.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  // Variable representativa de los items del menu
  private menu: any[];

  // Variable para mostrar la categoria seleccionada
  private category: any;

  // Variable para controlar el máximo de caracteres a mostrar en la tarjeta
  private maxDescLength: number;

  @ViewChild('mainTrigger') menuTrigger: MatMenuTrigger;

  constructor(private categoryService: CategoryService, private resourceService: ResourceService, private loanService: LoanRequestService, private dialog: MatDialog) {
    this.menu = [];
    this.maxDescLength = 60;
    this.buildMainMenu();
  }

  ngOnInit() {
    this.category = null;
  }

  openMainMenu() {
    if (!this.menuTrigger.menuOpen) {
      this.menuTrigger.openMenu();
    }
  }

  getUrlImage(image) {
    return this.resourceService.getUrlGetImage(image);
  }

  sendJSON(json) {
    return JSON.stringify(json);
  }

  getSelection(idFinalCategory: String) {
    this.categoryService.getCategory(idFinalCategory).subscribe(
      response => {
        this.category = (<any>response).category;
        this.getResourcesCategory();
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  getResourcesCategory() {
    this.resourceService.getResourcesCategory(this.category._id).subscribe(
      response => {
        this.category.resources = (<any>response).resources;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  // Funcion encargada de calcular el número de caracteres a mostrar en la descripción del dispositivo (solo para la vista en el modelo de tarjetas)
  getShortDescription(description) {
    var shortDescrip = description;
    if (description.length > this.maxDescLength) {
      shortDescrip = description.substr(0, this.maxDescLength) + " ...";
    }
    return shortDescrip;
  }

  private buildMainMenu() {
    this.categoryService.getSimpleMainCategories().subscribe(
      response => {
        this.menu = (<any>response).categories;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  showDetails(resource) {
    this.dialog.open(DataInfoResourceComponent, { data: resource });
  }

  loan(resource) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Seguro que desea solicitar el prestamo de este recurso?." }).beforeClose().subscribe(
      result => {
        let idUser = this.getIdUser();
        this.registerLoan(new RequestLoan("", idUser, resource._id));
      }
    );
  }

  registerLoan(request) {
    this.loanService.create(request).subscribe(
      response => {
        let info: Information = { title: "Solicitud de Préstamo", message: "La solicitud de préstamo se generó exitosamente" };
        this.dialog.open(InfoDialogComponent, { data: info });
      },
      error => {
        let info: Information = { title: "Solicitud inválida", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  getIdUser(): String {
    var id: String = null;
    var identity = localStorage.getItem('identity');
    if (identity) {
      let user = JSON.parse(identity);
      id = user._id;
    }
    return id;
  }

}
