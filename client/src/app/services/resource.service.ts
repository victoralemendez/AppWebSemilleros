import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private url: string;

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
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
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

  getUrlGetImage(image) {
    return this.url + "get-image-resource/" + image;
  }

  public updateImage(resourceId: string, files: Array<File>) {
    return this.updateImageFile(this.url, resourceId, files);
  }

  private updateImageFile(url: string, resourceId: string, files: Array<File>): Promise<any> {
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
      xhr.open("POST", url + "upload-image-resource/" + resourceId, true);
      //xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}
