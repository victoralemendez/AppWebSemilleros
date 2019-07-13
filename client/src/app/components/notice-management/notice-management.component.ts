import { MatDialog } from '@angular/material/dialog';
import { DataNoticeComponent } from '../data-notice/data-notice.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-management',
  templateUrl: './notice-management.component.html',
  styleUrls: ['./notice-management.component.css']
})
export class NoticeManagementComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
}