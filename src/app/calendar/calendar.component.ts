import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DayDialogComponent } from '../day-dialog/day-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendar: any = null;

  constructor(
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    const uuid = this.route.snapshot.paramMap.get('uid');
    this.db.object('calendars/' + uuid).valueChanges().subscribe(val => {
      this.calendar = val;
    });
  }

  open(index: number) {
    this.dialog.open(DayDialogComponent, {
      data: {
        text: this.calendar?.days?.[index]?.text
      }
    })
  }
}
