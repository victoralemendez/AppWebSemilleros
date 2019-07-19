import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { GlOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url: String;
  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
   }

  public create(event) {
    let paramsJSON = JSON.stringify(event);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "event", paramsJSON, { headers: headers });
  }

  public getEvents() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "events", { headers: headers });
  }

  public update(event) {
    let paramsJSON = JSON.stringify(event);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-course/" + event._id, paramsJSON, { headers: headers });
  }

  public delete(eventId) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.url + "delete-course/" + eventId, { headers: headers });
  }
}
