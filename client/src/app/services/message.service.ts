import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  public save(message) {
    let paramsJSON = JSON.stringify(message);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.url + "message", paramsJSON, {headers: headers});
  }

  public update(message) {
    let paramsJSON = JSON.stringify(message);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(this.url + "update-message/" + message._id, paramsJSON, {headers: headers});
  }

  public getMessages() {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.url + "messages", {headers: headers});
  }

  public delete(idMessage) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(this.url + "delete-message/" + idMessage, {headers: headers});
  }

}
