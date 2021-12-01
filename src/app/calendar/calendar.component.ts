import { Component } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { DocumentReference } from 'rxfire/firestore/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';
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
  uid?: string;
  demo = false;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private afs: Firestore, private meta: Meta) {
    this.meta.updateTag({ name: 'description', content: "Calendrier de l'avent en ligne" });
    this.route.paramMap.subscribe((paramMap) => {
      const uid = paramMap.get('uid');
      if (uid) {
        this.uid = uid;
        const calendarDoc = doc(this.afs, 'calendars/' + this.uid);
        docData<Calendar>(calendarDoc as DocumentReference<Calendar>).subscribe((val) => {
          this.loading = false;
          this.calendar = val;
          this.demo = val?.demo ?? false;
        });
      }
    });
  }

  open(index: number) {
    if (this.calendar) {
      const filename = this.calendar.author + '/calendars/' + this.uid + '/' + index + '.html';
      this.dialog.open(DayDialogComponent, {
        maxWidth: '95vw',
        maxHeight: '80vh',
        data: {
          filename: filename
        }
      });
    }
  }
}
