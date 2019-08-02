import { Component, Inject } from '@angular/core';

// Imports de angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-data-info-device',
  templateUrl: './data-info-device.component.html',
  styleUrls: ['./data-info-device.component.css']
})
export class DataInfoDeviceComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private device) { }

  

}
