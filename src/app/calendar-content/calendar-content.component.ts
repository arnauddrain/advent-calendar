import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-calendar-content',
  templateUrl: './calendar-content.component.html',
  styleUrls: ['./calendar-content.component.css']
})
export class CalendarContentComponent {
  @Output() open = new EventEmitter<number>();
  @Input() editing: boolean = false;

  constructor() { }

  get days(): string[] {
    return Array(25).map(() => {
      return '';
    });
  }

  click(index: number) {
    if (this.isAvailable(index)) {
      this.open.emit(index);
    }
  }

  isAvailable(index: number) {
    const now = new Date();
    console.log(now, now.getFullYear(), now.getMonth(), now.getDate(), index);
    return (this.editing || now.getFullYear() > 2020 || (now.getFullYear() === 2020 && now.getMonth() >= 11 && now.getDate() > index));
  }
}
