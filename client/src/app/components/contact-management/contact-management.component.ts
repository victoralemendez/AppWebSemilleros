import { Component, OnInit } from '@angular/core';

// Componentes de Angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { DataContactComponent } from '../data-contact/data-contact.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css']
})
export class ContactManagementComponent implements OnInit {

  // Variable para gestionar la información de contacto
  private contacts: any[];

  // Variables para imprimir mensajes
  private msgError: String;

  constructor(public dialog: MatDialog, private contactService: ContactService) {
    this.contacts = [];
    this.msgError = "";
  }

  ngOnInit() {
    this.msgError = "";
    this.showContacts();
  }

  // Funcion encargada de fijar el mensaje presentado al usuario
  private getInfo() {
    return this.contacts.length == 0 ? "No hay información de contacto registrada" : "Número de información encontrada: " + this.contacts.length;
  }

  private createContact() {
    var contact: Contact = new Contact("", "", "");
    this.dialog.open(DataContactComponent, { data: contact }).afterClosed().subscribe(result => {
      if (result) {
        this.contactService.create(contact).subscribe(
          response => {
            var info: Information = { title: "Información creada", message: "La información de contacto se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.contacts.push((<any>response).contact);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  private updateContact(index) {
    var contact: Contact = Contact.buildFromJSON(this.contacts[index]);
    this.dialog.open(DataContactComponent, { data: contact }).afterClosed().subscribe(result => {
      if (result) {
        this.contactService.update(contact).subscribe(
          response => {
            var info: Information = { title: "Información actualizada", message: "La información de contacto se actualizó exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.contacts[index] = contact;
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  private deleteContact(index) {
    var contact = this.contacts[index];
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación de la información de contacto?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.contactService.delete(contact._id).subscribe(
          response => {
            this.contacts.splice(index, 1);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          });
      }
    });
  }

  showContacts() {
    this.contactService.getContacts().subscribe(
      response => {
        this.contacts = (<any>response).contacts;
      },
      error => {
        this.msgError = (<any>error).error.message;
      }
    );
  }

}
