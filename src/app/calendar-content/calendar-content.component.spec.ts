import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarContentComponent } from './calendar-content.component';

describe('CalendarContentComponent', () => {
  let component: CalendarContentComponent;
  let fixture: ComponentFixture<CalendarContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
