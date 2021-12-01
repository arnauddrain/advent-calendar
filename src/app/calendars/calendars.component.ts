import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Auth, signOut, user, User } from '@angular/fire/auth';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Firestore, collection, collectionData, query, where, Query } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';
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
    private afs: Firestore,
    private analytics: Analytics,
    private router: Router,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) platformId: string,
    private meta: Meta
  ) {
    this.meta.updateTag({
      name: 'description',
      content:
        "Créez votre propre calendrier de l'avent en ligne personnalisé pour les fêtes de noël simplement, gratuitement et sans pubs !"
    });
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
    const calendarQuery = query<Calendar>(
      collection(this.afs, '/calendars') as Query<Calendar>,
      where('author', '==', this.user?.uid ?? '')
    );
    this.calendars = collectionData<Calendar>(calendarQuery, { idField: 'key' }).pipe(tap(() => (this.loading = false)));
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
