import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../services/course.service';
import { NewsService } from '../../services/news.service';
import { EventService } from '../../services/event.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';


import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private news: any[];
  private events: any[];
  private courses: any[];

  constructor(public courseService: CourseService, public newsService: NewsService, public eventService: EventService, private dialog: MatDialog) {
    this.courses = [];
    this.news = [];
  }

  ngOnInit() {
    this.showCourses();
    this.showNews();
  }

  showNews() {
    this.newsService.getNews().subscribe(
      response => {
        this.news = (<any>response).news;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }



  showCourses() {
    this.courseService.getCourses().subscribe(
      response => {
        this.courses = (<any>response).courses;
      },
      error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }


  private getUrlNewsImage(image) {
    return this.newsService.getUrlGetImage(image);
  }

}
