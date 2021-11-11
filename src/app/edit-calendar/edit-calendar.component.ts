import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { DayEditDialogComponent } from '../day-edit-dialog/day-edit-dialog.component';
import { DeleteCalendarDialogComponent } from '../delete-calendar-dialog/delete-calendar-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {
  calendar: any = null;
  uid: string = '';
  editing = false;
  user: firebase.User | null = null;

  constructor(
    private auth: AngularFireAuth,
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private analytics: AngularFireAnalytics,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      this.uid = this.route.snapshot.paramMap.get('uid') ?? '';
      this.auth.user.subscribe((user) => {
        this.user = user;
        if (!user || (this.calendar && user.uid !== this.calendar.author)) {
          this.router.navigate(['/']);
        }
      });
      this.db
        .object('calendars/' + this.uid)
        .valueChanges()
        .subscribe((val) => {
          this.calendar = val;
          if (this.user && this.user.uid !== this.calendar.author) {
            this.router.navigate(['/']);
          }
        });
    }
  }

  ngOnInit() {
    this.analytics.logEvent('Edit calendar');
  }

  get url(): string {
    return window.location.origin + '/' + this.uid;
  }

  async settings() {
    this.analytics.logEvent('Open settings');
    this.dialog
      .open(SettingsDialogComponent, {
        data: {
          calendar: this.calendar
        }
      })
      .afterClosed()
      .subscribe((dates) => {
        if (dates?.startDate && dates?.endDate) {
          this.analytics.logEvent('Save settings');
          this.db.object('calendars/' + this.uid + '/startDate').set(dates.startDate.toISOString());
          this.db.object('calendars/' + this.uid + '/endDate').set(dates.endDate.toISOString());
        }
      });
  }

  async open(index: number) {
    this.analytics.logEvent('Open day');
    const filename = this.calendar.author + '/calendars/' + this.uid + '/' + index + '.html';
    this.dialog.open(DayEditDialogComponent, {
      data: {
        filename: filename
      }
    });
  }

  share() {
    this.analytics.logEvent('Share');
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        text: 'Le lien a été copié dans le presse-papier !',
        link: this.url
      }
    });
  }

  edit() {
    if (this.editing) {
      this.analytics.logEvent('Edit calendar name');
      this.db.object('calendars/' + this.uid + '/name').set(this.calendar.name);
    }
    this.editing = !this.editing;
  }

  deleteCalendar() {
    this.analytics.logEvent('Delete calendar');
    this.dialog
      .open(DeleteCalendarDialogComponent, {})
      .afterClosed()
      .subscribe(async (result) => {
        if (result) {
          await this.db.object('calendars/' + this.uid).remove();
          this.bottomSheet.open(BottomSheetComponent, {
            data: {
              text: `Le calendrier a bien été supprimé. En cas d'erreur vous pouvez joindre l'administrateur via la page Facebook (lien en haut à droite)`
            }
          });
          this.router.navigate(['']);
        }
      });
  }
}
