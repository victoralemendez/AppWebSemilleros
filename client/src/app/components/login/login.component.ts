import { Component, OnInit } from '@angular/core';

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
  private msg_error: String;

  constructor(private userService: UserService) {
    this.hide = true;
    this.msg_error = "";
    this.user = new User("", "", "", "victoralemendez@unicauca.edu.co", "1234567", "", "", 0);
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
            this.userService.signIn(this.user.clone(), 'true').subscribe(
              response => {
                let res = <any>response;
                let token = res.token;
                if (token.length <= 0) {
                  alert("no se ha generado el token");
                } else {
                  localStorage.setItem('token', token);
                  this.user = new User("", "", "", "", "", "", "", 0);
                }
              },
              error => {
                let err = <any>error;
                if (err != null) {
                  this.msg_error = err.error.message;
                }
              }
            )
          }
        },
        error => {
          let err = <any>error;
          if (err != null) {
            this.msg_error = err.error.message;
          }
        }
      );
    }
  }

  validInputs() {
    let valid = this.user.email.length > 0 && this.user.password.length > 0
    this.msg_error = valid ? '' : "Todos los campos son requeridos";
    return valid;
  }

}
