import { Component, OnInit } from '@angular/core';

// Componentes de angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { Loan, DataResource } from '../../models/loan';
import { LoanService } from '../../services/loan.service';
import { DataLoanComponent } from '../data-loan/data-loan.component';
import { LoanRequestService } from '../../services/loan-request.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';
import { Utilities } from '../../services/utilities';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-loans-management',
  templateUrl: './loans-management.component.html',
  styleUrls: ['./loans-management.component.css']
})
export class LoansManagementComponent implements OnInit {

  private queueReqs: any[];
  private activeLoans: any[];
  private selectedReq: any;

  constructor(private loanReqService: LoanRequestService, private dialog: MatDialog, private loanService: LoanService, private resourceService: ResourceService) {
    this.queueReqs = [];
    this.activeLoans = [];
    this.selectedReq = null;
  }

  ngOnInit() {
    this.showQueueReq();
    this.showLoans();
  }

  showQueueReq() {
    this.loanReqService.getReqPerUser().subscribe(
      response => {
        this.queueReqs = (<any>response).requests;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  getUserName() {
    var name: String = null;
    var identity = localStorage.getItem('identity');
    if (identity) {
      let json = JSON.parse(identity);
      name = (json.name) + " " + (json.surname);
    } else {
      var info: Information = { title: "Error", message: "No se encontró al usuario" };
      this.dialog.open(InfoDialogComponent, { data: info });
    }
    return name;
  }

  buildLoan(requestLoan) {
    var loan = null;
    var resources: DataResource[] = [];
    for (let index = 0; index < requestLoan.resources.length; index++) {
      let resource = requestLoan.resources[index];
      if (resource.select) {
        resources.push({ _id: resource._id, name: resource.name, note: "", quantity: 0 });
      }
    }
    var name = this.getUserName();
    if (name) {
      loan = new Loan("", requestLoan.user[0]._id, Utilities.parseDateToString(new Date(), '-'), null, "", name, resources, "");
    }
    return loan;
  }

  selectResource(indexReq, indexResource) {
    var req = this.queueReqs[indexReq];
    req.resources[indexResource].select = true;
  }

  deselectResource(indexReq, indexResource) {
    var req = this.queueReqs[indexReq];
    req.resources[indexResource].select = false;
  }

  showLoans() {
    this.loanService.getActiveLoans().subscribe(
      response => {
        this.activeLoans = (<any>response).loans;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  createLoan(request) {
    var loan: Loan = this.buildLoan(request);
    if (loan && this.validateLoan(loan)) {
      this.dialog.open(DataLoanComponent, { data: loan }).beforeClosed().subscribe(result => {
        this.loanService.create(loan).subscribe(
          response => {
            var info: Information = { title: "Préstamo", message: "Préstamo generado con exito" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.deleteRequest(loan.user, loan.resources);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      });
    }
  }

  validateLoan(loan): Boolean {
    var valid = loan.resources.length > 0;
    if (!valid) {
      var info: Information = { title: "Préstamo inválido", message: "Selecciona los dispositivos incluidos en el préstamo" };
      this.dialog.open(InfoDialogComponent, { data: info });
    }
    return valid;
  }

  deleteRequest(userId, resources) {
    for (let index = 0; index < resources.length; index++) {
      let resourceId = resources[index]._id;
      this.loanReqService.delete({ user: userId, resource: resourceId }).subscribe(
        response => {
          if (index == resources.length - 1) {
            this.showLoans();
          }
        },
        error => {
          this.showQueueReq();
          var info: Information = { title: "Error", message: (<any>error).error.message };
          this.dialog.open(InfoDialogComponent, { data: info });
        }
      );
    }
  }

  getUrlImage(image) {
    return this.resourceService.getUrlGetImage(image);
  }

}
