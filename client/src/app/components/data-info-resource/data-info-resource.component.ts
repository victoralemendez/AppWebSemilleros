import { Component, Inject } from '@angular/core';

// Imports de angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-data-info-resource',
  templateUrl: './data-info-resource.component.html',
  styleUrls: ['./data-info-resource.component.css']
})
export class DataInfoResourceComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private device) { }

  

}
