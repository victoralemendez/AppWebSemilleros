import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;

  constructor(public http: HttpClient) {
    this.url = GlOBAL.url;
  }

  signIn(userLogin, getHash = null) {
    if (getHash != null) {
      userLogin.getHash = getHash;
    }
    let paramsJSON = JSON.stringify(userLogin);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "login", paramsJSON, { headers: headers });
  }

  register(newUser) {
    let paramsJSON = JSON.stringify(newUser);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "register-user", paramsJSON, { headers: headers });
  }

  update(user) {
    let paramsJSON = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "update-user/" + user._id, paramsJSON, { headers: headers });
  }

  delete(id) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.url + "delete-user/" + id, { headers: headers });
  }

  getRequests() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "requests", { headers: headers });
  }

  getUsers() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.url + "users", { headers: headers });
  }

  getUrlGetImage(image) {
    return this.url + "get-image-user/" + image;
  }

  public updateImage(userId: string, files: Array<File>) {
    return this.updateImageFile(this.url, userId, files);
  }

  private updateImageFile(url: string, userId: string, files: Array<File>): Promise<any> {
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
      xhr.open("POST", url + "upload-image-user/" + userId, true);
      //xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

}
