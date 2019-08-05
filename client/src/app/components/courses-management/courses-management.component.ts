import { Component, OnInit } from '@angular/core';

// Componentes de Angular material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios propios
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataCourseComponent, Data } from '../data-course/data-course.component';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-courses-management',
  templateUrl: './courses-management.component.html',
  styleUrls: ['./courses-management.component.css']
})

// Componente encargado de la gestion de cursos
export class CoursesManagementComponent implements OnInit {

  // Variable para gestionar los cursos
  private courses: Course[];

  // Variable para controlar el máximo de caracteres a mostrar en la tarjeta
  private maxDescLength: number;

  // Variables para imprimir mensajes
  private msgError: String;

  constructor(public dialog: MatDialog, private courseService: CourseService) {
    this.courses = [];
    this.maxDescLength = 80;
  }

  ngOnInit() {
    this.loadCourses();
    this.msgError = '';
  }

  getUrlImage(image) {
    return this.courseService.getUrlGetImage(image);
  }

  // Funcion encargada de la respuesta del servidor al crear un curso
  createCourse() {
    let newCourse: Course = new Course("", "", "", "", 0, "", "", "", false);
    var data: Data = { course: newCourse };
    this.dialog.open(DataCourseComponent, { data: data }).beforeClosed().subscribe(result => {
      if (result) {
        this.courseService.create(newCourse).subscribe(
          response => {
            var info: Information = { title: "Curso creado", message: "El curso se ha creado exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            this.courses.push((<any>response).course);
            if (data.image) {
              this.uploadImage((<any>response).course._id, data.image);
            }
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  // Cargar imagen al servidor
  uploadImage(courseId, files) {
    this.courseService.updateImage(courseId, files)
      .then((result: any) => {
        this.loadCourses();
      });
  }

  // Funcion encargada de la respuesta del servidor al modificar un curso
  updateCourse(json: any, index: number) {
    var courseCloned: Course = new Course(json._id, json.name, json.description, json.link, json.score, json.startDate, json.endDate, json.teacher, json.internalTeacher, json.image);
    var data: Data = { course: courseCloned };
    this.dialog.open(DataCourseComponent, { data: data }).beforeClosed().subscribe(result => {
      if (result) {
        this.courseService.update(courseCloned).subscribe(
          response => {
            this.courses[index] = courseCloned;
            var info: Information = { title: "Curso actualizado", message: "El curso se actualizó exitosamente" };
            this.dialog.open(InfoDialogComponent, { data: info });
            if (data.image) {
              this.uploadImage(courseCloned._id, data.image);
            }
          },
          error => {
            var info: Information = { title: "Error", message: (<any>error).error.message };
            this.dialog.open(InfoDialogComponent, { data: info });
          }
        );
      }
    });
  }

  // Funcion encargada de la respuesta del servidor al eliminar un curso
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

  // Funcion encargada de fijar el mensaje presentado al usuario
  private getInfo() {
    return this.courses.length == 0 ? "No hay cursos registrados" : "Número de cursos encontrados: " + this.courses.length;
  }

  // Funcion encargada de la respuesta del servidor al obtener los cursos
  loadCourses() {
    this.courseService.getCourses().subscribe(
      response => {
        this.courses = (<any>response).courses as Course[];
      },
      error => {
        this.msgError = (<any>error).error.message;
      }
    );
  }

  // Funcion encargada de calcular el número de caracteres a mostrar en la descripción del curso (solo para la vista en el modelo de tarjetas)
  getShortDescription(description) {
    var result = description;
    if (result.length > this.maxDescLength) {
      result = description.substr(0, this.maxDescLength) + " ...";
    }
    return result;
  }

}
