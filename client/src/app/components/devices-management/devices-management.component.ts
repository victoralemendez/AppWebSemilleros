import { Component, OnInit } from '@angular/core';

// Componentes de Angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { Device } from '../../models/device';
import { DataDeviceComponent } from '../data-device/data-device.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-devices-management',
  templateUrl: './devices-management.component.html',
  styleUrls: ['./devices-management.component.css']
})
export class DevicesManagementComponent implements OnInit {

  // Variable para gestionar los dispositivos
  private devices: any[];

  // Variable para controlar el máximo de caracteres a mostrar en la tarjeta
  private maxDescLength: number;

  // Variables para imprimir mensajes
  private msgError: String;

  constructor(public dialog: MatDialog, private deviceService: DeviceService) {
    this.devices = [];
    this.maxDescLength = 80;
  }

  ngOnInit() {
    this.showDevices();
    this.msgError = "";
  }

  showDevices() {
    this.deviceService.getDevices().subscribe(
      response => {
        this.devices = (<any>response).devices;
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
    return this.devices.length == 0 ? "No hay cursos registrados" : "Número de dispositivos encontrados: " + this.devices.length;
  }

  // Funcion encargada de la respuesta del servidor al crear un curso
  createDevice() {
    let newDevice: Device = new Device("", "", "", false, "", "");
    this.dialog.open(DataDeviceComponent, { data: newDevice }).beforeClosed().subscribe(result => {
      if (result) {
        this.deviceService.create(newDevice).subscribe(
          response => {
            var info: Information = { title: "Dispositivo creado", message: "El dispositivo se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.devices.push((<any>response).device);
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
    return description.substr(0, this.maxDescLength) + " ...";
  }

  // Funcion encargada de la respuesta del servidor al modificar un curso
  updateDevice(json: Device, index: number) {
    var deviceCloned: Device = new Device(json._id, json.name, json.description, json.avialable, json.reference, json.features, json.image);
    this.dialog.open(DataDeviceComponent, { data: deviceCloned }).beforeClosed().subscribe(result => {
      if (result) {
        this.deviceService.update(deviceCloned).subscribe(
          response => {
            this.devices[index] = deviceCloned;
            var info: Information = { title: "Dispositivo actualizado", message: "El dispositivo se actualizó exitosamente" };
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
