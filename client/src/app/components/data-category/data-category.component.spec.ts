import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCategoryComponent } from './data-category.component';

describe('DataCategoriesComponent', () => {
  let component: DataCategoryComponent;
  let fixture: ComponentFixture<DataCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
