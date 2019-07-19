import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { Notice } from '../../models/notice';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-data-notice',
  templateUrl: './data-notice.component.html',
  styleUrls: ['./data-notice.component.css']
})

 


export class DataNoticeComponent {
   // Variables para controlar la cantidad de caracteres por campo
   private length: Number;

  // Variable para mostrar mensaje de error
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) public notice: Notice, private dialog: MatDialogRef<any>) {
    this.msgError = '';
    this.length=500;
   }

   validData(): boolean {
    return this.notice.name.length > 0 && this.notice.description.length > 0 ;
  }

  closeDialog(){
    var close: boolean=false;
    if(this.validData()){
      this.dialog.close(true);
    }
    else{
      this.msgError='Todos los campos son obligatorios.'
    }
    return close;
  }

}
