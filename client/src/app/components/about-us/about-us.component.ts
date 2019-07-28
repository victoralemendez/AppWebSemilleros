import { Component, OnInit } from '@angular/core';

// Componentes de Angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { InfoService } from '../../services/info.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  private informations: any[];

  constructor(private infoService: InfoService, private dialog: MatDialog) { }

  ngOnInit() {
    this.showInformations();
  }

  showInformations() {
    this.infoService.getInformations().subscribe(
      response => {
        this.informations = (<any>response).informations;
      },
      error => {
        var info = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

}
