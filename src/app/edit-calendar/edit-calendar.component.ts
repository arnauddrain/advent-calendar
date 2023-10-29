import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Firestore, updateDoc, doc, deleteDoc, docData } from '@angular/fire/firestore';
import { DocumentReference } from 'rxfire/firestore/interfaces';
import { Auth, user, User } from '@angular/fire/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { DayEditDialogComponent } from '../day-edit-dialog/day-edit-dialog.component';
import { DeleteCalendarDialogComponent } from '../delete-calendar-dialog/delete-calendar-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { isPlatformBrowser } from '@angular/common';
import { Calendar } from '../calendar';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent implements OnInit {
  calendar?: Calendar;
  uid: string = '';
  user: User | null = null;

  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private analytics: Analytics,
    private afs: Firestore,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.meta.updateTag({
      name: 'description',
      content:
        "Créez votre propre calendrier de l'avent en ligne personnalisé pour les fêtes de noël simplement, gratuitement et sans pubs !"
    });
    this.title.setTitle("eCalendrier - Calendrier de l'avent en ligne");
    if (isPlatformBrowser(platformId)) {
      this.uid = this.route.snapshot.paramMap.get('uid') ?? '';
      user(this.auth).subscribe((user) => {
        this.user = user;
        if (!user || (this.calendar && user.uid !== this.calendar.author)) {
          this.router.navigate(['/']);
        }
      });

      const calendarDoc = doc(this.afs, 'calendars/' + this.uid);
      docData<Calendar>(calendarDoc as DocumentReference<Calendar>).subscribe((val) => {
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
          updateDoc(doc(this.afs, 'calendars/' + this.uid), { startDate: data.startDate });
        }
        if (data?.endDate) {
          updateDoc(doc(this.afs, 'calendars/' + this.uid), { endDate: data.endDate });
        }
        if (data?.name) {
          updateDoc(doc(this.afs, 'calendars/' + this.uid), { name: data.name });
        }
      });
  }

  async open(index: number) {
    logEvent(this.analytics, 'Open day');
    const filename = this.calendar?.author + '/calendars/' + this.uid + '/' + index + '.html';
    this.dialog.open(DayEditDialogComponent, {
      maxWidth: '95vw',
      maxHeight: '80vh',
      data: {
        filename: filename
      }
    });
  }

  share() {
    logEvent(this.analytics, 'Open Share');
    this.dialog.open(ShareDialogComponent, {
      data: {
        uid: this.uid
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
          await deleteDoc(doc(this.afs, 'calendars/' + this.uid));
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
