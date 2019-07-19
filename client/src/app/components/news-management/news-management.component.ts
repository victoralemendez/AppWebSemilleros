import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { News } from '../../models/news';
import { NewsService } from '../../services/news.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataNewsComponent } from '../data-news/data-news.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.css']
})
export class NewsManagementComponent implements OnInit {
  private maxDescLength: number;
  private newss: News[];

  private msgInfo: String;
  private msgError: String;

  constructor(public dialog: MatDialog,private newsService: NewsService) { 
    this.newss=[];
    this.maxDescLength = 80;
  }

  ngOnInit() {
    this.loadNews();
    this.msgError = '';
  }

  createNews() {
    let newNews: News = new News("","","","");
    this.dialog.open(DataNewsComponent, { data: newNews }).beforeClosed().subscribe(result => {
      if (result) {
        this.newsService.create(newNews).subscribe(
          response => {
            var info: Information = { title: "Noticia creada", message: "La Noticia se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.newss.push((<any>response).news);
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
    var newsCloned: News = new News(json._id, json.name, json.description,  json.image);
    this.dialog.open(DataNewsComponent, { data: newsCloned }).beforeClosed().subscribe(result => {
      if (result) {
        this.newsService.update(newsCloned).subscribe(
          response => {
            this.newss[index] = newsCloned;
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

  deleteNews(course: News, index: number) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación de la noticia?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.newsService.delete(course._id).subscribe(
          response => {
            this.newss.splice(index, 1);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          });
      }
    });
  }

  private getInfo() {
    return this.newss.length == 0 ? "No hay noticias registradas" : "Número de noticias encontradas: " + this.newss.length;
    
  }

  loadNews() {
    this.newsService.getNews().subscribe(
      response => {
        this.newss = (<any>response).newss as News[];
      },
      error => {
        this.msgError = (<any>error).error.message;
      }
    );
  }

  getShortDescription(description) {
    return description.substr(0, this.maxDescLength) + " ...";
  }

}