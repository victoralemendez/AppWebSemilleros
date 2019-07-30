import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  public create(contact) {
    let paramsJSON = JSON.stringify(contact);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "contact", paramsJSON, { headers: headers });
  }

  public getContacts() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "contacts", { headers: headers });
  }

  public update(contact) {
    let paramsJSON = JSON.stringify(contact);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-contact/" + contact._id, paramsJSON, { headers: headers });
  }

  public delete(contactId) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.url + "delete-contact/" + contactId, { headers: headers });
  }

}
