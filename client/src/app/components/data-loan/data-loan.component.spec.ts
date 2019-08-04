import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoanComponent } from './data-loan.component';

describe('DataLoanComponent', () => {
  let component: DataLoanComponent;
  let fixture: ComponentFixture<DataLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
