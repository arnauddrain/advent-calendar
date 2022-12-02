import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Calendar } from '../calendar';

interface Day {
  date: number;
  available: boolean;
  index: number;
}

@Component({
  selector: 'app-calendar-content',
  templateUrl: './calendar-content.component.html'
})
export class CalendarContentComponent implements OnChanges {
  @Output() openContent = new EventEmitter<number>();
  @Input() editing: boolean = false;
  @Input() demo: boolean = false;
  @Input() calendar?: Calendar;
  days: Day[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor() {}

  ngOnChanges(): void {
    if (this.calendar) {
      this.startDate = new Date(this.calendar.startDate ? this.calendar.startDate + 'T00:00:00' : '2020-12-01T00:00:00');
      this.endDate = new Date(this.calendar.endDate ? this.calendar.endDate + 'T00:00:00' : '2020-12-25T00:00:00');
    }
    if (this.demo) {
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 9);
      this.startDate.setHours(0, 0, 0, 0);
      this.endDate = new Date(this.startDate);
      this.endDate.setDate(this.endDate.getDate() + 24);
    }
    this.days = [];
    const currentDate = new Date(this.startDate);
    const now = new Date();
    let index = 0;
    while (currentDate <= this.endDate) {
      this.days.push({
        date: currentDate.getDate(),
        available: now > currentDate,
        index: index
      });
      index++;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  click(day: Day) {
    if (this.editing || day.available) {
      this.openContent.emit(day.index);
    }
  }
}
