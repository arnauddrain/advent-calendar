import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalendarComponent } from './edit-calendar.component';

describe('EditCalendarComponent', () => {
  let component: EditCalendarComponent;
  let fixture: ComponentFixture<EditCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
