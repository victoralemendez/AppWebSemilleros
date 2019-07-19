import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';
@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  
  private url: String;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
   }

  public create(notice) {
    let paramsJSON = JSON.stringify(notice);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "notice", paramsJSON, { headers: headers });
  }

  public getNotice() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "notices", { headers: headers });
  }

  public update(notice) {
    let paramsJSON = JSON.stringify(notice);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-notice/" + notice._id, paramsJSON, { headers: headers });
  }

  public delete(noticeId) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.url + "delete-notice/" + noticeId, { headers: headers });
  }
}
