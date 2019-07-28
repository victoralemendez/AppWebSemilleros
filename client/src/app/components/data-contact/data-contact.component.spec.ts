import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataContactComponent } from './data-contact.component';

describe('DataContactComponent', () => {
  let component: DataContactComponent;
  let fixture: ComponentFixture<DataContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
