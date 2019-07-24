import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-content',
  templateUrl: './config-content.component.html',
  styleUrls: ['./config-content.component.css']
})
export class ConfigContentComponent implements OnInit {

  // Variable para definir la opcion de configuracion seleccionada por defecto
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
