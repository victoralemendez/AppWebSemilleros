import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Componentes de Angular Material
import { MatDialog } from '@angular/material/dialog';

// Componentes y servicios proprios
import { CategoryService } from '../../services/category.service';
import { InfoDialogComponent, Information } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-menu-part',
  templateUrl: './menu-part.component.html',
  styleUrls: ['./menu-part.component.css']
})
export class MenuPartComponent implements OnInit {

  @Output() select: EventEmitter<String>;
  @Input() category: any;
  private finalCategory: Boolean;

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {
    this.finalCategory = false;
    this.select = new EventEmitter<String>();
  }

  ngOnInit() {
    this.category = JSON.parse(this.category);
    this.buildMenuSubcategories();
  }

  sendSelection(idChildSelected: String) {
    this.selectCategory(idChildSelected);
  }

  selectCategory(idCategory: String) {
    this.select.emit(idCategory);
  }

  // Función encargada de crear el menú de caegorias desplegadas
  private buildMenuSubcategories() {
    this.categoryService.getSimpleSubCategories(this.category._id).subscribe(
      response => {
        this.category.categories = (<any>response).categories;
        this.finalCategory = this.category.categories.length == 0;
      }, error => {
        var info: Information = { title: "Error", message: (<any>error).error.message };
        this.dialog.open(InfoDialogComponent, { data: info });
      }
    );
  }

  sendJSON(json) {
    return JSON.stringify(json);
  }

}
