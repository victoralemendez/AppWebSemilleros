import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GlOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: String;

  constructor(public http: HttpClient) {
    this.url = GlOBAL.url;
  }

  signIn(userLogin, getHash = null) {
    if (getHash != null) {
      userLogin.getHash = getHash;
    }
    let paramsJSON = JSON.stringify(userLogin);
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post(this.url + "login", paramsJSON, {headers: headers});
  }

  register(newUser) {
    let paramsJSON = JSON.stringify(newUser);
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post(this.url + "register-user", paramsJSON, {headers: headers});
  }

  update(user) {
    let paramsJSON = JSON.stringify(user);
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.put(this.url + "update-user/" + user._id, paramsJSON, {headers: headers});
  }

  delete(id) {
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.delete(this.url + "delete-user/" + id, {headers: headers});
  }

  getRequests() {
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.get(this.url + "requests", {headers: headers});
  }

  getUsers() {
    let headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.get(this.url + "users", {headers: headers});
  }

}
