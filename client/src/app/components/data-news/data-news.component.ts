import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { News } from '../../models/news';

@Component({
  selector: 'app-data-news',
  templateUrl: './data-news.component.html',
  styleUrls: ['./data-news.component.css']
})

export class DataNewsComponent {
  // Variables para controlar la cantidad de caracteres por campo
  private length: Number;

  // Variable para mostrar mensaje de error
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) public news: News, private dialog: MatDialogRef<any>) {
    this.msgError = '';
    this.length = 500;
  }

  validData(): boolean {
    return this.news.name.length > 0 && this.news.description.length > 0;
  }

  closeDialog() {
    var close: boolean = false;
    if (this.validData()) {
      this.dialog.close(true);
    }
    else {
      this.msgError = 'Todos los campos son obligatorios.'
    }
    return close;
  }

}
