import { Component } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { DocumentReference } from 'rxfire/firestore/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { makeStateKey, Meta, Title, TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '../calendar';

import { DayDialogComponent } from '../day-dialog/day-dialog.component';
import { waitFor } from '../libs/wait-for';

const STATE_KEY_DEMO = makeStateKey<boolean>('demo');
const STATE_KEY_UID = makeStateKey<string>('uid');
const STATE_KEY_LOADING = makeStateKey<boolean>('loading');
const STATE_KEY_CALENDAR = makeStateKey<Calendar>('calendar');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  loading = true;
  calendar?: Calendar;
  uid?: string;
  demo = false;
  test = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private afs: Firestore,
    private meta: Meta,
    private title: Title,
    private state: TransferState
  ) {
    this.retrieveState();
    this.meta.updateTag({ name: 'description', content: "Calendrier de l'avent en ligne" });

    this.route.paramMap.subscribe(async (paramMap) => {
      const uid = paramMap.get('uid');
      if (uid && uid !== this.calendar?.key) {
        this.uid = uid;
        const calendarDoc = doc(this.afs, 'calendars/' + this.uid);
        this.calendar = (await waitFor(getDoc<Calendar>(calendarDoc as DocumentReference<Calendar>))).data();
        this.loading = false;
        this.demo = this.calendar?.demo ?? false;
        this.setState();
        this.title.setTitle(this.calendar?.name + " - Calendrier de l'avent");
        this.meta.updateTag({ name: 'description', content: "Calendrier de l'avent en ligne - " + this.calendar?.name });
      }
    });
  }

  private retrieveState() {
    this.demo = this.state.get(STATE_KEY_DEMO, this.demo);
    this.uid = this.state.get(STATE_KEY_UID, this.uid);
    this.loading = this.state.get(STATE_KEY_LOADING, this.loading);
    this.calendar = this.state.get(STATE_KEY_CALENDAR, this.calendar);
  }

  private setState() {
    this.state.set(STATE_KEY_DEMO, this.demo);
    this.state.set(STATE_KEY_UID, this.uid);
    this.state.set(STATE_KEY_LOADING, this.loading);
    this.state.set(STATE_KEY_CALENDAR, this.calendar);
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
