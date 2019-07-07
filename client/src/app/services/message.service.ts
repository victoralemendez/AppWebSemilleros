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

}
