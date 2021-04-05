import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { DayEditDialogComponent } from '../day-edit-dialog/day-edit-dialog.component';
import { DeleteCalendarDialogComponent } from '../delete-calendar-dialog/delete-calendar-dialog.component';
import { FileService } from '../file.service';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {
  calendar: any = null;
  uid: string;
  editing = false;

  constructor(
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private fileService: FileService,
    private analytics: AngularFireAnalytics
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid') ?? '';
    this.db
      .object('calendars/' + this.uid)
      .valueChanges()
      .subscribe((val) => {
        this.calendar = val;
      });
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
        if (dates) {
          this.analytics.logEvent('Save settings');
          this.db.object('calendars/' + this.uid + '/startDate').set(dates.startDate.toISOString());
          this.db.object('calendars/' + this.uid + '/endDate').set(dates.endDate.toISOString());
        }
      });
  }

  async open(index: number) {
    this.analytics.logEvent('Open day');
    const filename = this.calendar.author + '/calendars/' + this.uid + '/' + index + '.html';
    this.fileService
      .get(filename)
      .pipe(
        take(1),
        catchError(() => of(''))
      )
      .subscribe((content) => {
        this.dialog
          .open(DayEditDialogComponent, {
            data: {
              text: content
            }
          })
          .afterClosed()
          .subscribe((result) => {
            if (result) {
              this.analytics.logEvent('Save day');
              this.fileService.upload(filename, result);
            }
          });
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
