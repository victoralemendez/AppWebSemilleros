import { Component, OnInit, ViewChild } from '@angular/core';

// Componentes de Angular Material
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios proprios
import { DeviceService } from '../../services/device.service';
import { CategoryService } from '../../services/category.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

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

  constructor(private categoryService: CategoryService, private deviceService: DeviceService, private dialog: MatDialog) {
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

  sendJSON(json) {
    return JSON.stringify(json);
  }

  getSelection(idFinalCategory: String) {
    this.categoryService.getCategory(idFinalCategory).subscribe(
      response => {
        this.category = (<any>response).category;
        this.getDevicesCategory();
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  getDevicesCategory() {
    this.deviceService.getDevicesCategory(this.category._id).subscribe(
      response => {
        this.category.devices = (<any>response).devices;
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

}
