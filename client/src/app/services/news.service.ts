import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url: string;

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

  getUrlGetImage(image) {
    return this.url + "get-image-news/" + image;
  }

  public updateImage(newsId: string, files: Array<File>) {
    return this.updateImageFile(this.url, newsId, files);
  }

  private updateImageFile(url: string, newsId: string, files: Array<File>): Promise<any> {
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
      xhr.open("POST", url + "upload-image-news/" + newsId, true);
      //xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}
