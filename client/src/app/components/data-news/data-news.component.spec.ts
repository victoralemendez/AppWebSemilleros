import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataNewsComponent } from './data-news.component';

describe('DataNewsComponent', () => {
  let component: DataNewsComponent;
  let fixture: ComponentFixture<DataNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
