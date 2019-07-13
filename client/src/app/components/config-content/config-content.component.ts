import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-content',
  templateUrl: './config-content.component.html',
  styleUrls: ['./config-content.component.css']
})
export class ConfigContentComponent implements OnInit {

  private codeDisplayed: number;

  constructor() {
    this.codeDisplayed = 1;
  }

  ngOnInit() {
  }

  displayCourses() {
    this.codeDisplayed = 1;
  }

  displayNotice() {
    this.codeDisplayed = 2;
  }

  displayRequests() {
    this.codeDisplayed = 11;
  }

}
