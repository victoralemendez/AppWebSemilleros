import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private user: User;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadUser();
  }

  private getShortName() {
    var names = this.user.name.split(' ');
    var surnames = this.user.surname.split(' ');
    return names[0] + " " + surnames[0];
  }

  private loadUser() {
    var identity = localStorage.getItem('identity');
    this.user = null;
    if (identity != 'null') {
      let json = JSON.parse(identity);
      this.user = User.buildFromJSON(json);
    }
  }

  goToHome() {
    this.router.navigateByUrl("home");
  }

  goToLogin() {
    this.router.navigateByUrl("login");
  }

  goToAboutUs() {
    this.router.navigateByUrl("aboutus");
  }

  goToRegister() {
    this.router.navigateByUrl("register");
  }

  goToConfig() {
    this.router.navigateByUrl("config-content");
  }

  goToContact() {
    this.router.navigateByUrl("contact");
  }

  logOut() {
    localStorage.setItem('identity', null);
    localStorage.setItem('token', null);
    this.loadUser();
    this.goToHome();
  }

}
