import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Database, objectVal, ref, remove, set } from '@angular/fire/database';
import { Auth, user, User } from '@angular/fire/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { DayEditDialogComponent } from '../day-edit-dialog/day-edit-dialog.component';
import { DeleteCalendarDialogComponent } from '../delete-calendar-dialog/delete-calendar-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { Calendar } from '../calendar';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {
  calendar: Calendar | null = null;
  uid: string = '';
  user: User | null = null;

  constructor(
    private auth: Auth,
    public db: Database,
    private route: ActivatedRoute,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private analytics: Analytics,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      this.uid = this.route.snapshot.paramMap.get('uid') ?? '';
      user(this.auth).subscribe((user) => {
        this.user = user;
        if (!user || (this.calendar && user.uid !== this.calendar.author)) {
          this.router.navigate(['/']);
        }
      });
      const calendarRef = ref(this.db, 'calendars/' + this.uid);
      objectVal<Calendar>(calendarRef).subscribe((val) => {
        this.calendar = val;
        if (this.user && this.user.uid !== this.calendar?.author) {
          this.router.navigate(['/calendars']);
        }
      });
    }
  }

  ngOnInit() {
    logEvent(this.analytics, 'Edit calendar');
  }

  get url(): string {
    return window.location.origin + '/' + this.uid;
  }

  async settings() {
    logEvent(this.analytics, 'Open settings');
    this.dialog
      .open(SettingsDialogComponent, {
        data: {
          calendar: this.calendar
        }
      })
      .afterClosed()
      .subscribe((data) => {
        logEvent(this.analytics, 'Save settings');
        if (data?.startDate) {
          set(ref(this.db, 'calendars/' + this.uid + '/startDate'), data.startDate.toISOString());
        }
        if (data?.endDate) {
          set(ref(this.db, 'calendars/' + this.uid + '/endDate'), data.endDate.toISOString());
        }
        if (data?.name) {
          set(ref(this.db, 'calendars/' + this.uid + '/name'), data.name);
        }
      });
  }

  async open(index: number) {
    logEvent(this.analytics, 'Open day');
    const filename = this.calendar?.author + '/calendars/' + this.uid + '/' + index + '.html';
    this.dialog.open(DayEditDialogComponent, {
      maxWidth: '95vw',
      data: {
        filename: filename
      }
    });
  }

  share() {
    logEvent(this.analytics, 'Share');
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        text: 'Le lien a été copié dans le presse-papier !',
        link: this.url
      }
    });
  }

  deleteCalendar() {
    logEvent(this.analytics, 'Delete calendar');
    this.dialog
      .open(DeleteCalendarDialogComponent, {})
      .afterClosed()
      .subscribe(async (result) => {
        if (result) {
          const calendarRef = ref(this.db, 'calendars/' + this.uid);
          await remove(calendarRef);
          this.bottomSheet.open(BottomSheetComponent, {
            data: {
              text: `Le calendrier a bien été supprimé. En cas d'erreur vous pouvez me joindre via la page Facebook (lien en haut à droite)`
            }
          });
          this.router.navigate(['/calendars']);
        }
      });
  }
}
