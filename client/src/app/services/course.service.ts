import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = GlOBAL.url;
  }

  public create(course) {
    let paramsJSON = JSON.stringify(course);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "course", paramsJSON, { headers: headers });
  }

  public getCourses() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "courses", { headers: headers });
  }

  public update(course) {
    let paramsJSON = JSON.stringify(course);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-course/" + course._id, paramsJSON, { headers: headers });
  }

  public delete(courseId) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.url + "delete-course/" + courseId, { headers: headers });
  }

  getUrlGetImage(image) {
    return this.url + "get-image-course/" + image;
  }

  public updateImage(courseId: string, files: Array<File>) {
    return this.updateImageFile(this.url, courseId, files);
  }

  private updateImageFile(url: string, courseId: string, files: Array<File>): Promise<any> {
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
      xhr.open("POST", url + "upload-image-course/" + courseId, true);
      //xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}
