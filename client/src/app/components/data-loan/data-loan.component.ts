import { Component, Inject } from '@angular/core';

// Componentes de angular material
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Componentes y servicios propios
import { Loan } from '../../models/loan';

@Component({
  selector: 'app-data-loan',
  templateUrl: './data-loan.component.html',
  styleUrls: ['./data-loan.component.css']
})
export class DataLoanComponent {

  // Variables para mostrar error presentados en los campos
  private msgError: String;

  constructor(@Inject(MAT_DIALOG_DATA) public loan: Loan, private dialog: MatDialogRef<any>) {
    this.msgError = "";
  }

  validData() {
    var valid: boolean = true;
    for (let index = 0; index < this.loan.resources.length; index++) {
      let resource = this.loan.resources[index];
      if (resource.quantity <= 0 || resource.quantity > 40) {
        valid = false;
        break;
      }
    }
    return valid;
  }

  // Funcion para cerrar el dialogo
  closeDialog() {
    var close: boolean = false;
    if (this.validData()) {
      this.dialog.close(true);
    } else {
      this.msgError = 'La cantidad de cada elemento debe ser positiva y menor a 41';
    }
    return close;
  }

}

