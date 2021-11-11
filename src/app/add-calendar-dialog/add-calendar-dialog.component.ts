import { Component, Inject } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-add-calendar-dialog',
  templateUrl: './add-calendar-dialog.component.html'
})
export class AddCalendarDialogComponent {
  name: string = '';
  user: firebase.User;
  savingCalendar = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: firebase.User },
    private analytics: AngularFireAnalytics,
    private db: AngularFireDatabase,
    public dialogRef: MatDialogRef<AddCalendarDialogComponent>
  ) {
    this.user = data.user;
  }

  async saveCalendar() {
    if (this.user && this.name && !this.savingCalendar) {
      this.analytics.logEvent('Create calendar');
      this.savingCalendar = true;
      await this.db.list('/calendars').push({
        name: this.name,
        author: this.user.uid,
        startDate: '2021-11-30T23:00:00.000Z',
        endDate: '2021-12-24T23:00:00.000Z'
      });
      this.name = '';
      this.savingCalendar = false;
      this.dialogRef.close();
    }
  }
}
