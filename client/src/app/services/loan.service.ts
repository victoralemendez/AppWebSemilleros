import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  create(loan) {
    var paramsJSON = JSON.stringify(loan);
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "loan", paramsJSON, { headers });
  }

  update(loan) {
    var paramsJSON = JSON.stringify(loan);
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-loan/" + loan._id, paramsJSON, { headers });
  }

  getActiveLoans() {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "active-loans", { headers });
  }

}
