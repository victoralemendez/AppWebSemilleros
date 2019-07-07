import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataCourseComponent } from '../data-course/data-course.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-courses-management',
  templateUrl: './courses-management.component.html',
  styleUrls: ['./courses-management.component.css']
})
export class CoursesManagementComponent implements OnInit {

  private courses: Course[];

  private maxDescLength: number;

  private msgInfo: String;
  private msgError: String;

  constructor(public dialog: MatDialog, private courseService: CourseService) {
    this.courses = [];
    this.maxDescLength = 80;
  }

  ngOnInit() {
    this.loadCourses();
    this.msgError = '';
  }

  createCourse() {
    let newCourse: Course = new Course("", "", "", "", 0, "", "");
    this.dialog.open(DataCourseComponent, { data: newCourse }).beforeClosed().subscribe(result => {
      if (result) {
        this.courseService.create(newCourse).subscribe(
          response => {
            var info: Information = { title: "Curso creado", message: "El curso se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.courses.push((<any>response).course);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  updateCourse(json: Course, index: number) {
    var courseCloned: Course = new Course(json._id, json.name, json.description, json.link, json.score, json.startDate, json.endDate, json.image);
    this.dialog.open(DataCourseComponent, { data: courseCloned }).beforeClosed().subscribe(result => {
      if (result) {
        this.courseService.update(courseCloned).subscribe(
          response => {
            this.courses[index] = courseCloned;
            var info: Information = { title: "Curso actualizado", message: "El curso se actualizó exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  deleteCourse(course: Course, index: number) {
    this.dialog.open(ConfirmDialogComponent, { data: "¿Desea continuar con la eliminación del curso?, los datos serán eliminados de forma permanente" }).beforeClosed().subscribe(result => {
      if (result) {
        this.courseService.delete(course._id).subscribe(
          response => {
            this.courses.splice(index, 1);
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          });
      }
    });
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(
      response => {
        this.courses = (<any>response).courses as Course[];
        this.msgInfo = "Número de cursos encontrados: " + this.courses.length;
      },
      error => {
        this.msgError = (<any>error).error.message;
      }
    );
  }

  getShortDescription(description) {
    return description.substr(0, this.maxDescLength) + " ...";
  }

}
