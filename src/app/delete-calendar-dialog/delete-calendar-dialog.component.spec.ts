import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCalendarDialogComponent } from './delete-calendar-dialog.component';

describe('DeleteCalendarDialogComponent', () => {
  let component: DeleteCalendarDialogComponent;
  let fixture: ComponentFixture<DeleteCalendarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCalendarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
