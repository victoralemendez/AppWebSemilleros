import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-menu-part',
  templateUrl: './menu-part.component.html',
  styleUrls: ['./menu-part.component.css']
})
export class MenuPartComponent implements OnInit {

  @ViewChild('menuTrigger') clickHoverMenuTrigger: MatMenuTrigger;

  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.clickHoverMenuTrigger.openMenu();
  }

}
