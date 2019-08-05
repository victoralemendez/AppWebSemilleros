import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  public create(event) {
    let paramsJSON = JSON.stringify(event);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "event", paramsJSON, { headers: headers });
  }

  public getEvents() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "events", { headers: headers });
  }

  public update(event) {
    let paramsJSON = JSON.stringify(event);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-event/" + event._id, paramsJSON, { headers: headers });
  }

  public delete(eventId) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.url + "delete-event/" + eventId, { headers: headers });
  }

  getUrlGetImage(image) {
    return this.url + "get-image-event/" + image;
  }

  public updateImage(eventId: string, files: Array<File>) {
    return this.updateImageFile(this.url, eventId, files);
  }

  private updateImageFile(url: string, eventId: string, files: Array<File>): Promise<any> {
    return new Promise(function (resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (let index = 0; index < files.length; index++) {
        formData.append('image', files[index], files[index].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url + "upload-image-event/" + eventId, true);
      //xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}