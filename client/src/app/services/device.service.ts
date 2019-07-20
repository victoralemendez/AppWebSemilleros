import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  public create(device) {
    let paramsJSON = JSON.stringify(device);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "device", paramsJSON, { headers: headers });
  }

  public update(device) {
    let params = JSON.stringify(device);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.put(this.url + "device/" + device._id, params, { headers: headers });
  }

  public getDevices() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "devices", { headers: headers });
  }

}
