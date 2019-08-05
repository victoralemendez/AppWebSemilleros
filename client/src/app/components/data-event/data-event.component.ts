import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-data-event',
  templateUrl: './data-event.component.html',
  styleUrls: ['./data-event.component.css']
})
export class DataEventComponent {

  // Variable para la seleccion de imagen del curso
  private filesToUpload: Array<File>;

  // Variables para controlar la cantidad de caracteres por campo
  private length: Number;

  // Variables para configurar las fechas
  private startDateControl: FormControl;
  private minStartDate: Date;

  // Variable para mostrar mensaje de error
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private dialog: MatDialogRef<any>, private eventService: EventService) {
    this.loadEventData();
    this.length = 500;
    this.minStartDate = new Date(new Date());
    this.startDateControl.disable();
    this.msgError = '';
  }
  // Funcion que calcula la minima fecha de fin a partir de la fecha de inicio seleccionada
  calculateMinEndDate() {
    return new Date(this.startDateControl.value);
  }

  private loadEventData() {
    if (this.data.event._id == "") {
      this.startDateControl = new FormControl(new Date());
    } else {
      this.startDateControl = new FormControl(Utilities.parseStringToDate(this.data.event.date, "-"));
    }
  }

  // Funcion para capturar las imagenes a subir
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  private getUrlImage() {
    return this.eventService.getUrlGetImage(this.data.event.image);
  }

  // Funcion para validar el llenado de campos
  validData(): boolean {
    return this.data.event.name.length > 0 && this.data.event.description.length > 0 && this.startDateControl.value != null;
  }

  // Funcion para cerrar el dialogo
  closeDialog() {
    var close: boolean = false;
    if (this.validData()) {
      this.data.event.date = Utilities.parseDateToString(this.startDateControl.value, "-");
      if (this.filesToUpload) {
        this.data.image = this.filesToUpload;
      }
      this.dialog.close(true);
    } else {
      this.msgError = 'Todos los campos son obligatorios, los creditos deben ser superiores a cero';
    }
    return close;
  }

}

export interface Data {
  event: Event,
  image?: Array<File>
}
