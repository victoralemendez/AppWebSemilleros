import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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

  goToContact() {
    this.router.navigateByUrl("contact");
  }

}
