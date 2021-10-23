import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent {
  newCalendarName: string = '';
  calendars: Observable<any[]> | null;
  user: firebase.User | null = null;
  addingCalendar = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private analytics: AngularFireAnalytics,
    private router: Router
  ) {
    this.calendars = null;
    auth.user.subscribe((user) => {
      this.user = user;
      this.calendars = this.db
        .list('/calendars', (ref) => ref.orderByChild('author').equalTo(this.user?.uid ?? ''))
        .snapshotChanges()
        .pipe(map((changes) => changes.map((c) => ({ key: c.payload.key, value: c.payload.val() }))));
    });
  }

  async addCalendar() {
    if (this.user && !this.addingCalendar) {
      this.analytics.logEvent('Create calendar');
      this.addingCalendar = true;
      await this.db.list('/calendars').push({
        name: this.newCalendarName,
        author: this.user.uid,
        startDate: '2021-11-30T23:00:00.000Z',
        endDate: '2021-12-24T23:00:00.000Z'
      });
      this.newCalendarName = '';
      this.addingCalendar = false;
    }
  }

  async logout() {
    this.analytics.logEvent('Logout');
    await this.auth.signOut();
    this.router.navigate(['']);
  }
}
