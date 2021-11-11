import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AddCalendarDialogComponent } from '../add-calendar-dialog/add-calendar-dialog.component';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html'
})
export class CalendarsComponent {
  calendars: Observable<any[]> | null = null;
  user: firebase.User | null = null;
  loading = true;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private analytics: AngularFireAnalytics,
    private router: Router,
    private dialog: MatDialog,
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
    this.dialog.open(AddCalendarDialogComponent, {
      data: {
        user: this.user
      }
    });
  }

  async logout() {
    this.analytics.logEvent('Logout');
    await this.auth.signOut();
    this.router.navigate(['']);
  }
}
