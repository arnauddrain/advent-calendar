import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: ['./calendar-content.component.css']
})
export class CalendarContentComponent implements OnChanges {
  @Output() open = new EventEmitter<number>();
  @Input() editing: boolean = false;
  @Input() demo: boolean = false;
  @Input() calendar: any;
  days: { date: number; available: boolean; index: number }[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor() {}

  ngOnChanges(): void {
    this.startDate = new Date(this.calendar.startDate ? this.calendar.startDate : '2020-12-01T00:00:00');
    this.endDate = new Date(this.calendar.endDate ? this.calendar.endDate : '2020-12-25T00:00:00');
    if (this.demo) {
      this.startDate = new Date();
      this.startDate.setDate(this.startDate.getDate() - 10);
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

  click(day: any) {
    if (this.editing || day.available) {
      this.open.emit(day.index);
    }
  }
}
