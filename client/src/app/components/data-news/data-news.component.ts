import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

// Imports de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes propios
import { News } from '../../models/news';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-data-news',
  templateUrl: './data-news.component.html',
  styleUrls: ['./data-news.component.css']
})

export class DataNewsComponent {

  // Variable para la seleccion de imagen del curso
  private filesToUpload: Array<File>;

  // Variables para controlar la cantidad de caracteres por campo
  private length: Number;

  // Variable para mostrar mensaje de error
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private dialog: MatDialogRef<any>, public newsService: NewsService) {
    this.msgError = '';
    this.length = 500;
  }

  // Funcion para capturar las imagenes a subir
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  validData(): boolean {
    return this.data.news.name.length > 0 && this.data.news.description.length > 0;
  }

  private getUrlImage() {
    return this.newsService.getUrlGetImage(this.data.news.image);
  }

  closeDialog() {
    var close: boolean = false;
    if (this.validData()) {
      if (this.filesToUpload) {
        this.data.image = this.filesToUpload;
      }
      this.dialog.close(true);
    }
    else {
      this.msgError = 'Todos los campos son obligatorios.'
    }
    return close;
  }

}

export interface Data {
  news: News,
  image?: Array<File>
}