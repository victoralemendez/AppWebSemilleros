import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  public create(resource) {
    let paramsJSON = JSON.stringify(resource);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "resource", paramsJSON, { headers: headers });
  }

  public update(resource) {
    let params = JSON.stringify(resource);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.put(this.url + "resource/" + resource._id, params, { headers: headers });
  }

  public getResources() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "resources", { headers: headers });
  }

  public getResourcesCategory(idCategory) {    
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "resources-category/" + idCategory, { headers: headers });
  }

}
