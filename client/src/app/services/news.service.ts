import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
   }

  public create(news) {
    let paramsJSON = JSON.stringify(news);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "news", paramsJSON, { headers: headers });
  }

  public getNews() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "news", { headers: headers });
  }

  public update(news) {
    let paramsJSON = JSON.stringify(news);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-news/" + news._id, paramsJSON, { headers: headers });
  }

  public delete(newsId) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.url + "delete-news/" + newsId, { headers: headers });
  }
}
