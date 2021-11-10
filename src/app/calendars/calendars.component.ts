import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html'
})
export class CalendarsComponent {
  newCalendarName: string = '';
  calendars: Observable<any[]> | null = null;
  user: firebase.User | null = null;
  savingCalendar = false;
  addingCalendar = false;
  loading = true;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private analytics: AngularFireAnalytics,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      auth.user.subscribe((user) => {
        if (!user) {
          this.router.navigate(['/']);
        }
        this.user = user;
        this.calendars = this.db
          .list('/calendars', (ref) => ref.orderByChild('author').equalTo(this.user?.uid ?? ''))
          .snapshotChanges()
          .pipe(
            tap(() => (this.loading = false)),
            map((changes) => changes.map((c) => ({ key: c.payload.key, value: c.payload.val() })))
          );
      });
    }
  }

  addCalendar() {
    this.addingCalendar = true;
  }

  async saveCalendar() {
    if (this.user && !this.savingCalendar) {
      this.analytics.logEvent('Create calendar');
      this.savingCalendar = true;
      await this.db.list('/calendars').push({
        name: this.newCalendarName,
        author: this.user.uid,
        startDate: '2021-11-30T23:00:00.000Z',
        endDate: '2021-12-24T23:00:00.000Z'
      });
      this.newCalendarName = '';
      this.savingCalendar = false;
    }
  }

  async logout() {
    this.analytics.logEvent('Logout');
    await this.auth.signOut();
    this.router.navigate(['']);
  }
}
