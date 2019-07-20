import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-content',
  templateUrl: './config-content.component.html',
  styleUrls: ['./config-content.component.css']
})
export class ConfigContentComponent implements OnInit {

  private codeDisplayed: number;

  constructor() {
    this.codeDisplayed = 8;
  }

  ngOnInit() {
  }

  displayOption(optionCode) {
    this.codeDisplayed = optionCode;
  }

}
