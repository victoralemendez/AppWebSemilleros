import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Notice } from '../../models/notice';
import { NoticeService } from '../../services/notice.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataNoticeComponent } from '../data-notice/data-notice.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-notice-management',
  templateUrl: './notice-management.component.html',
  styleUrls: ['./notice-management.component.css']
})
export class NoticeManagementComponent implements OnInit {
  private maxDescLength: number;
  private notices: Notice[];

  private msgInfo: String;
  private msgError: String;

  constructor(public dialog: MatDialog,private noticeService: NoticeService) { 
    this.notices=[];
    this.maxDescLength = 80;
  }

  ngOnInit() {
    this.loadNotices();
    this.msgError = '';
  }

  createNotice() {
    let newNotice: Notice = new Notice("","","","");
    this.dialog.open(DataNoticeComponent, { data: newNotice }).beforeClosed().subscribe(result => {
      if (result) {
        this.noticeService.create(newNotice).subscribe(
          response => {
            var info: Information = { title: "Noticia creada", message: "La Noticia se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.notices.push((<any>response).notice);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  updateNotice(json: Notice, index: number) {
    var noticeCloned: Notice = new Notice(json._id, json.name, json.description,  json.image);
    this.dialog.open(DataNoticeComponent, { data: noticeCloned }).beforeClosed().subscribe(result => {
      if (result) {
        this.noticeService.update(noticeCloned).subscribe(
          response => {
            this.notices[index] = noticeCloned;
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

  deleteNotice(course: Notice, index: number) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación de la noticia?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.noticeService.delete(course._id).subscribe(
          response => {
            this.notices.splice(index, 1);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          });
      }
    });
  }

  private getInfo() {
    return this.notices.length == 0 ? "No hay noticias registradas" : "Número de noticias encontradas: " + this.notices.length;
    
  }

  loadNotices() {
    this.noticeService.getNotice().subscribe(
      response => {
        this.notices = (<any>response).notices as Notice[];
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