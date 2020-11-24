import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent {
  calendar: any = null;
  uid: string;

  constructor(
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private route: ActivatedRoute
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid') ?? '';
    this.db.object('calendars/' + this.uid).valueChanges().subscribe(val => {
      this.calendar = val;
    });
  }

  get url(): string {
    return window.location.origin + '/' + this.uid;
  }

  share() {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        text: 'Lien copié'
      }
    });
  }
}
