import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {

  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  public create(request) {
    let paramsJSON = JSON.stringify(request);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "loan-request", paramsJSON, { headers: headers });
  }

  public delete(request) {
    let paramsJSON = JSON.stringify(request);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "delete-request", paramsJSON, { headers: headers });
  }

  public getReqPerUser() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "get-request-user", { headers: headers });
  }

}
