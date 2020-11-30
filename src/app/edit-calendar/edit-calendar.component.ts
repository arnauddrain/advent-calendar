import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { DayEditDialogComponent } from '../day-edit-dialog/day-edit-dialog.component';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent {
  calendar: any = null;
  uid: string;
  editing = false;

  constructor(
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid') ?? '';
    this.db.object('calendars/' + this.uid).valueChanges().subscribe(val => {
      this.calendar = val;
    });
  }

  get url(): string {
    return window.location.origin + '/' + this.uid;
  }

  open(index: number) {
    this.dialog.open(DayEditDialogComponent, {
      data: {
        text: this.calendar?.days?.[index]?.text
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.db.object('calendars/' + this.uid + '/days/' + index).set({ text: result });
      }
    });
  }

  share() {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        text: 'Le lien a été copié dans le presse-papier !',
        link: this.url
      }
    });
  }

  edit() {
    if (this.editing) {
      this.db.object('calendars/' + this.uid + '/name').set(this.calendar.name);
    }
    this.editing = !this.editing;
  }
}
