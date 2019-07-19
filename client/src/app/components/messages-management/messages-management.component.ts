import { Component, OnInit } from '@angular/core';

// Componentes de Angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MessageService } from '../../services/message.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-messages-management',
  templateUrl: './messages-management.component.html',
  styleUrls: ['./messages-management.component.css']
})
export class MessagesManagementComponent implements OnInit {

  // Varable para controlar los mensajes
  private messages: any[];

  constructor(private messageService: MessageService, public dialog: MatDialog) {
    this.messages = [];
  }

  ngOnInit() {
    this.showMessages();
  }

  updateState(index) {
    var message = this.messages[index];
    if (!message.viewed) {
      message.viewed = true;
      this.messageService.update(message).subscribe(
        error => {
          var info: Information = { title: "Error", message: (<any>error).error.message };
          this.dialog.open(InfoDialogComponent, { data: info });
        }
      );
    }
  }

  getInfoMessage() {
    return this.messages == null || this.messages.length == 0 ? "No hay mensajes pendientes" : "Mensajes recibidos: " + this.messages.length;
  }

  showMessages() {
    this.messageService.getMessages().subscribe(
      response => {
        this.messages = (<any>response).messages;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  delete(index) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación del mensaje?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.processDelete(index);
      }
    });
  }

  processDelete(index) {
    var message = this.messages[index];
    this.messageService.delete(message._id).subscribe(
      response => {
        this.messages.splice(index, 1);
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

}
