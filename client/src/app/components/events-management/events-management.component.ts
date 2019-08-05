import { Component, OnInit } from '@angular/core';

// Componentes de angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios proprios
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataEventComponent, Data } from '../data-event/data-event.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-events-management',
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management.component.css']
})
export class EventsManagementComponent implements OnInit {
  private events: Event[];
  private maxDescLength: number;

  private msgInfo: String;
  private msgError: String;

  constructor(public dialog: MatDialog, private eventService: EventService) {
    this.events = [];
    this.maxDescLength = 80;
  }
  ngOnInit() {
    this.loadEvents();
    this.msgError = '';
  }

  createEvent() {
    let newEvent: Event = new Event("", "", "", 0, "", "");
    let data: Data = { event: newEvent };
    this.dialog.open(DataEventComponent, { data: data }).beforeClosed().subscribe(result => {
      if (result) {
        this.eventService.create(newEvent).subscribe(
          response => {
            var info: Information = { title: "Evento creado", message: "El evento se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            if (!data.image) {
              this.events.push((<any>response).event);
            } else {
              this.uploadImage((<any>response).event._id, data.image);
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

  updateEvent(json: Event, index: number) {
    var eventCloned: Event = new Event(json._id, json.name, json.description, json.score, json.date, json.image);
    let data: Data = { event: eventCloned };
    this.dialog.open(DataEventComponent, { data: data }).beforeClosed().subscribe(result => {
      if (result) {
        this.eventService.update(eventCloned).subscribe(
          response => {
            if (!data.image) {
              this.events[index] = eventCloned;
            } else {
              this.uploadImage(eventCloned._id, data.image);
            }
            var info: Information = { title: "Evento actualizado", message: "El evento se actualizó exitosamente" };
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

  deleteEvent(event: Event, index: number) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación del evento?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.eventService.delete(event._id).subscribe(
          response => {
            this.events.splice(index, 1);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          });
      }
    });
  }

  getUrlImage(image) {
    return this.eventService.getUrlGetImage(image);
  }

  // Cargar imagen al servidor
  uploadImage(eventId, files) {
    this.eventService.updateImage(eventId, files)
      .then((result: any) => {
        this.loadEvents();
      });
  }

  private getInfo() {
    return this.events.length == 0 ? "No hay eventos registrados" : "Número de eventos encontrados: " + this.events.length;
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      response => {
        this.events = (<any>response).events;
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
