import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInfoResourceComponent } from './data-info-resource.component';

describe('DataInfoResourceComponent', () => {
  let component: DataInfoResourceComponent;
  let fixture: ComponentFixture<DataInfoResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInfoResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInfoResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
