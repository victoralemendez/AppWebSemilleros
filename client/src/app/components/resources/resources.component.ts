import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  @ViewChild('clickHoverMenuTrigger') clickHoverMenuTrigger: MatMenuTrigger;

  constructor() {
  }

  ngOnInit() {

  }

  test() {
    console.log("hola");
  }

  openOnMouseOver() {
    if (!this.clickHoverMenuTrigger.menuOpen) {
      console.log("abriendo");
      this.clickHoverMenuTrigger.openMenu();
    }
  }

}
