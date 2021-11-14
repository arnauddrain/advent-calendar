import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Auth, signOut, user, User } from '@angular/fire/auth';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Database, equalTo, listVal, orderByChild, query, ref } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AddCalendarDialogComponent } from '../add-calendar-dialog/add-calendar-dialog.component';
import { Calendar } from '../calendar';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html'
})
export class CalendarsComponent {
  calendars: Observable<Calendar[] | null> | null = null;
  user: User | null = null;
  loading = true;
  calendarSubscription?: Subscription;

  constructor(
    private auth: Auth,
    private db: Database,
    private analytics: Analytics,
    private router: Router,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      user(this.auth).subscribe((user) => {
        if (!user) {
          this.router.navigate(['/']);
        } else {
          this.user = user;
          this.subscribeToCalendars();
        }
      });
    }
  }

  private subscribeToCalendars() {
    const calendarListRef = query(ref(this.db, '/calendars'), orderByChild('author'), equalTo(this.user?.uid ?? ''));
    /*
     ** RxFire has a very bad error management (at least for realtime database),
     ** so we need to be able to cancel the subscription when we logout to avoid a permission error that we wouldn't be able to catch...
     */
    this.calendarSubscription?.unsubscribe();
    this.calendarSubscription = listVal<Calendar>(calendarListRef, { keyField: 'key' })
      .pipe(tap(() => (this.loading = false)))
      .subscribe((data) => {
        this.calendars = of(data);
      });
  }

  addCalendar() {
    this.dialog
      .open(AddCalendarDialogComponent, {
        data: {
          user: this.user
        }
      })
      .afterClosed()
      .subscribe(() => {
        this.subscribeToCalendars();
      });
  }

  async logout() {
    logEvent(this.analytics, 'Logout');
    this.calendarSubscription?.unsubscribe();
    await signOut(this.auth);
    this.router.navigate(['']);
  }
}
