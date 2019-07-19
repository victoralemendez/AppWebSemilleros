import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


// Componentes propios
import { Course } from '../../models/course';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-data-course',
  templateUrl: './data-course.component.html',
  styleUrls: ['./data-course.component.css']
})
export class DataCourseComponent {

  // Variables para controlar la cantidad de caracteres por campo
  private length: Number;

  // Variables para configurar las fechas
  private startDateControl: FormControl;
  private endDateControl: FormControl;
  private minStartDate: Date;
  private maxStartDate: Date;

  // Variable para mostrar mensaje de error
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) public course: Course, private dialog: MatDialogRef<any>) {
    this.loadCourseData();
    this.length = 500;
    this.minStartDate = new Date(new Date());
    this.maxStartDate = new Date(new Date().getFullYear() + 2, 0, 1);
    this.startDateControl.disable();
    this.endDateControl.disable();
    this.msgError = '';
  }
  // Funcion que calcula la minima fecha de fin a partir de la fecha de inicio seleccionada
  calculateMinEndDate() {
    return new Date(this.startDateControl.value);
  }

  private loadCourseData() {
    if (this.course._id == "") {
      this.startDateControl = new FormControl(new Date());
      this.endDateControl = new FormControl();
    } else {
      this.startDateControl = new FormControl(Utilities.parseStringToDate(this.course.startDate, "-"));
      this.endDateControl = new FormControl(Utilities.parseStringToDate(this.course.endDate, "-"));
    }
  }

  // Funcion que calcula la maxima fecha de fin a partir de la fecha de inicio seleccionada
  calculateMaxEndDate() {
    return new Date(this.startDateControl.value.getFullYear() + 10, 0, 1)
  }

  // Funcion para validar el llenado de campos
  validData(): boolean {
    return this.course.name.length > 0 && this.course.score > 0 && this.course.link.length > 0 && this.course.description.length > 0 && this.startDateControl.value != null && this.endDateControl.value != null && this.course.duration.length>0;
  }

  // Funcion para cerrar el dialogo
  closeDialog() {
    var close: boolean = false;
    if (this.validData()) {
      this.course.startDate = Utilities.parseDateToString(this.startDateControl.value, "-");
      this.course.endDate = Utilities.parseDateToString(this.endDateControl.value, "-");
      this.dialog.close(true);
    } else {
      this.msgError = 'Todos los campos son obligatorios, los creditos deben ser superiores a cero';
    }
    return close;
  }

}
