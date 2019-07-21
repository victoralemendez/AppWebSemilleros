import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private hide;
  private user: User;
  private msgError: String;

  constructor(private userService: UserService, private router: Router) {
    this.hide = true;
    this.msgError = "";
    this.user = this.createEmptyUser();
  }

  ngOnInit() {

  }

  signIn() {
    if (this.validInputs()) {
      this.userService.signIn(this.user).subscribe(
        response => {
          let res = <any>response;
          let identity = res.user;
          if (!identity) {
            alert("El usuario no esta correctamente identificado");
          } else {
            localStorage.setItem('identity', JSON.stringify(identity));
            this.userService.signIn(this.user, 'true').subscribe(
              response => {
                let res = <any>response;
                let token = res.token;
                if (token.length <= 0) {
                  alert("no se ha generado el token");
                } else {
                  localStorage.setItem('token', token);
                  this.user = this.createEmptyUser();
                  this.router.navigateByUrl('/home');
                }
              },
              error => {
                this.processError(error);
              }
            )
          }
        },
        error => {
          this.processError(error);
        }
      );
    }
  }
  
  createEmptyUser() {
    return new User("", "", "", "", "", "", "", 1, false);
  }

  processError(error) {
    let err = <any>error;
    if (err != null) {
      this.msgError = err.error.message;
    }
  }

  validInputs() {
    let valid = this.user.email.length > 0 && this.user.password.length > 0
    this.msgError = valid ? '' : "Todos los campos son requeridos";
    return valid;
  }

}
