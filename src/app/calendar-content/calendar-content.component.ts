import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: ['./calendar-content.component.css']
})
export class CalendarContentComponent {
  @Output() open = new EventEmitter<number>();

  constructor() { }

  get days(): string[] {
    return Array(25).map(() => {
      return '';
    });
  }

  click(index: number) {
    this.open.emit(index);
  }
}
