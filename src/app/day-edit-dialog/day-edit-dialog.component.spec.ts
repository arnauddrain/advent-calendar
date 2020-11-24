import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayEditDialogComponent } from './day-edit-dialog.component';

describe('DayEditDialogComponent', () => {
  let component: DayEditDialogComponent;
  let fixture: ComponentFixture<DayEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
