import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { Event } from '../../models/event';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-data-event',
  templateUrl: './data-event.component.html',
  styleUrls: ['./data-event.component.css']
})
export class DataEventComponent{

  // Variables para controlar la cantidad de caracteres por campo
  private length: Number;

  // Variables para configurar las fechas
  private startDateControl: FormControl;
  private minStartDate: Date;

  // Variable para mostrar mensaje de error
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) public event: Event, private dialog: MatDialogRef<any>) { 
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
  if (this.event._id == "") {
    this.startDateControl = new FormControl(new Date());
  } else {
    this.startDateControl = new FormControl(Utilities.parseStringToDate(this.event.startDate, "-"));
  }
}



// Funcion para validar el llenado de campos
validData(): boolean {
  return this.event.name.length > 0 && this.event.description.length > 0 && this.startDateControl.value != null ;
}

// Funcion para cerrar el dialogo
closeDialog() {
  var close: boolean = false;
  if (this.validData()) {
    this.event.startDate = Utilities.parseDateToString(this.startDateControl.value, "-");
    this.dialog.close(true);
  } else {
    this.msgError = 'Todos los campos son obligatorios, los creditos deben ser superiores a cero';
  }
  return close;
}

}
