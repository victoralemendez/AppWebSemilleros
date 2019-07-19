import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import {Event} from '../../models/event';
import { EventService } from '../../services/event.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataEventComponent } from '../data-event/data-event.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-managemet.component.html',
  styleUrls: ['./event-managemet.component.css']
})
export class EventManagementComponent implements OnInit {
    private events: Event[];
    private maxDescLength: number;

    private msgInfo: String;
    private msgError: String;

  constructor(public dialog: MatDialog, private eventService: EventService) {
      this.events=[];
      this.maxDescLength=80;
   }
  ngOnInit() {
    this.loadEvents();
    this.msgError = '';
  }

  createEvent() {
    let newEvent: Event = new Event("", "", "","","");
    this.dialog.open(DataEventComponent, { data: newEvent }).beforeClosed().subscribe(result => {
      if (result) {
        this.eventService.create(newEvent).subscribe(
          response => {
            var info: Information = { title: "Evento creado", message: "El evento se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.events.push((<any>response).event);
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
    var eventCloned: Event = new Event(json._id, json.name, json.description,  json.startDate, json.image);
    this.dialog.open(DataEventComponent, { data: eventCloned }).beforeClosed().subscribe(result => {
      if (result) {
        this.eventService.update(eventCloned).subscribe(
          response => {
            this.events[index] = eventCloned;
            var info: Information = { title: "Curso actualizado", message: "El curso se actualizó exitosamente" };
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
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación del curso?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
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

  private getInfo() {
    return this.events.length == 0 ? "No hay eventos registrados" : "Número de eventos encontrados: " + this.events.length;
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      response => {
        this.events = (<any>response).events as Event[];
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

