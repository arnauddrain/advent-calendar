import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Auth, signOut, user, User } from '@angular/fire/auth';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Database, equalTo, listVal, orderByChild, query, ref } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
        }
        this.user = user;
        const calendarListRef = query(ref(this.db, '/calendars'), orderByChild('author'), equalTo(this.user?.uid ?? ''));
        this.calendars = listVal<Calendar>(calendarListRef, { keyField: 'key' }).pipe(tap(() => (this.loading = false)));
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
    logEvent(this.analytics, 'Logout');
    await signOut(this.auth);
    this.router.navigate(['']);
  }
}
