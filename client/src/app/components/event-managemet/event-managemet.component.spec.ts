import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagementComponent } from "./EventManagementComponent";

describe('EventManagementComponent', () => {
  let component: EventManagementComponent;
  let fixture: ComponentFixture<EventManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
