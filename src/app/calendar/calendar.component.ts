import { Component } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { DocumentReference } from 'rxfire/firestore/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '../calendar';

import { DayDialogComponent } from '../day-dialog/day-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  loading = true;
  calendar: Calendar | null = null;
  uid: string;
  demo = false;

  constructor(public db: Database, private route: ActivatedRoute, private dialog: MatDialog, private afs: Firestore) {
    this.uid = this.route.snapshot.paramMap.get('uid') ?? '';

    // temporary code
    const calendarRef = ref(this.db, 'calendars/' + this.uid);
    objectVal<Calendar>(calendarRef).subscribe((val) => {
      this.loading = false;
      this.calendar = val;
      this.demo = val?.demo ?? false;
    });

    // Future code
    // const calendarDoc = doc(this.afs, 'calendars/' + this.uid);
    // docData<Calendar>(calendarDoc as DocumentReference<Calendar>).subscribe((val) => {
    //   this.loading = false;
    //   this.calendar = val;
    //   this.demo = val?.demo ?? false;
    // });
  }

  open(index: number) {
    if (this.calendar) {
      const filename = this.calendar.author + '/calendars/' + this.uid + '/' + index + '.html';
      this.dialog.open(DayDialogComponent, {
        maxWidth: '95vw',
        data: {
          filename: filename
        }
      });
    }
  }
}
