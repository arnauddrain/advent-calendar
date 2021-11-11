import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendarDialogComponent } from './add-calendar-dialog.component';

describe('AddCalendarDialogComponent', () => {
  let component: AddCalendarDialogComponent;
  let fixture: ComponentFixture<AddCalendarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalendarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
