import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  create(info) {
    var paramsJSON = JSON.stringify(info);
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "information", paramsJSON, { headers });
  }

  update(info) {
    var paramsJSON = JSON.stringify(info);
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-info/" + info._id, paramsJSON, { headers });
  }

  delete(infoId) {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.url + "delete-info/" + infoId, { headers });
  }

  getInformations() {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "informations", { headers });
  }

}
