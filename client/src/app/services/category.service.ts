import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GlOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  public create(category) {
    let paramsJSON = JSON.stringify(category);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "category", paramsJSON, { headers: headers });
  }

  public getMainCategories() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "main-categories", { headers: headers });
  }

  public getFinalCategories() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "final-categories", { headers: headers });
  }

  public getSubCategories(idCategory) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "sub-categories/" + idCategory, { headers: headers });
  }

  public getSimpleMainCategories() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "simple-maincategories", { headers: headers });
  }

  public getSimpleSubCategories(idCategory) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "simple-subcategories/" + idCategory, { headers: headers });
  }

  public getCategory(idCategory) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "category/" + idCategory, { headers: headers });
  }

  public update(category) {
    let paramsJSON = JSON.stringify(category);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "category/" + category._id, paramsJSON, { headers: headers });
  }

}
