import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoManagementComponent } from './info-management.component';

describe('InfoManagementComponent', () => {
  let component: InfoManagementComponent;
  let fixture: ComponentFixture<InfoManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
