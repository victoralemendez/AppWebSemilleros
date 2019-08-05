import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { News } from '../../models/news';
import { NewsService } from '../../services/news.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataNewsComponent, Data } from '../data-news/data-news.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.css']
})
export class NewsManagementComponent implements OnInit {

  private maxDescLength: number;
  private news: News[];

  private msgInfo: String;
  private msgError: String;

  constructor(public dialog: MatDialog, private newsService: NewsService) {
    this.news = [];
    this.maxDescLength = 80;
  }

  ngOnInit() {
    this.loadNews();
    this.msgError = '';
  }

  private getUrlImage(image) {
    return this.newsService.getUrlGetImage(image);
  }

  // Cargar imagen al servidor
  uploadImage(newsId, files) {
    this.newsService.updateImage(newsId, files)
      .then((result: any) => {
        this.loadNews();
      });
  }

  createNews() {
    let newNews: News = new News("", "", "", "");
    let data: Data = { news: newNews };
    this.dialog.open(DataNewsComponent, { data: data }).beforeClosed().subscribe(result => {
      if (result) {
        this.newsService.create(newNews).subscribe(
          response => {
            var info: Information = { title: "Noticia creada", message: "La Noticia se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            if (!data.image) {
              this.news.push((<any>response).news);
            } else {
              this.uploadImage((<any>response).news._id, data.image);
            }
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  updateNews(json: News, index: number) {
    var newsCloned: News = new News(json._id, json.name, json.description, json.image);
    let data: Data = { news: newsCloned };
    this.dialog.open(DataNewsComponent, { data: data }).beforeClosed().subscribe(result => {
      if (result) {
        this.newsService.update(newsCloned).subscribe(
          response => {
            if (!data.image) {
              this.news[index] = newsCloned;
            } else {
              this.uploadImage(newsCloned._id, data.image);
            }
            var info: Information = { title: "Noticia actualizada", message: "La Noticia se actualizó exitosamente" };
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

  deleteNews(news: News, index: number) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación de la noticia?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.newsService.delete(news._id).subscribe(
          response => {
            this.news.splice(index, 1);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          });
      }
    });
  }

  private getInfo() {
    return this.news.length == 0 ? "No hay noticias registradas" : "Número de noticias encontradas: " + this.news.length;
  }

  loadNews() {
    this.newsService.getNews().subscribe(
      response => {
        this.news = (<any>response).news;
      },
      error => {
        this.msgError = (<any>error).error.message;
      }
    );
  }

  getShortDescription(description) {
    var result = description;
    if (description.length > this.maxDescLength) {
      result = description.substr(0, this.maxDescLength) + " ...";
    }
    return result;
  }

}
