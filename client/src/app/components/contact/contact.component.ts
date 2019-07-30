import { Component, OnInit } from '@angular/core';

// Componentes de Angular Material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { ContactService } from '../../services/contact.service';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private contacts: any[];
  private message: Message;
  private length: Number;
  private msgError: String;

  constructor(private dialog: MatDialog, private messageService: MessageService, private contactService: ContactService) {
    this.message = new Message("", "", "", "", "");
    this.contacts = [];
    this.length = 200;
    this.msgError = "";
  }

  send() {
    if (this.validData()) {
      this.messageService.save(this.message).subscribe(
        response => {
          this.showDialog((<any>response).message);
          this.msgError = "";
        },
        error => {
          this.showError(error);
        }
      );
    }
  }

  showError(err) {
    var error = <any>err;
    if (error != null) {
      this.msgError = error.error.message;
    }
  }

  showDialog(message) {
    var info: Information = { title: "Mensaje Enviado", message: message };
    this.dialog.open(InfoDialogComponent, { data: info }).beforeClosed().subscribe(result => {
      this.message = new Message("", "", "", "", "");
    });
  }

  validData(): boolean {
    var valid = this.message.fullname.length > 0 && this.message.email.length > 0 && this.message.phoneNumber.length > 0 && this.message.text.length > 0;
    if (!valid) {
      this.msgError = "Todos los campos son obligatorios";
    }
    return valid;
  }

  ngOnInit() {
    this.showContacts();
  }

  showContacts() {
    this.contactService.getContacts().subscribe(
      response => {
        this.contacts = (<any>response).contacts;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

}
