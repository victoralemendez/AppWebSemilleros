import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataNoticeComponent } from './data-notice.component';

describe('DataNoticeComponent', () => {
  let component: DataNoticeComponent;
  let fixture: ComponentFixture<DataNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
