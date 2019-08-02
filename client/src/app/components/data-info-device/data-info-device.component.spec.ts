import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInfoDeviceComponent } from './data-info-device.component';

describe('DataInfoDeviceComponent', () => {
  let component: DataInfoDeviceComponent;
  let fixture: ComponentFixture<DataInfoDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInfoDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInfoDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
