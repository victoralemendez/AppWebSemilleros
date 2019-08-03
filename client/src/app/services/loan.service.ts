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

  public create(loan) {
    let paramsJSON = JSON.stringify(loan);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "loan", paramsJSON, { headers: headers });
  }

}
