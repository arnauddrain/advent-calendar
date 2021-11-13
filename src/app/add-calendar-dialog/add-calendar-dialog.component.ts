import { Component, Inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Database, push, ref } from '@angular/fire/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-calendar-dialog',
  templateUrl: './add-calendar-dialog.component.html'
})
export class AddCalendarDialogComponent {
  name: string = '';
  user: User;
  savingCalendar = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private analytics: Analytics,
    private db: Database,
    public dialogRef: MatDialogRef<AddCalendarDialogComponent>
  ) {
    this.user = data.user;
  }

  async saveCalendar() {
    if (this.user && this.name && !this.savingCalendar) {
      logEvent(this.analytics, 'Create calendar');
      this.savingCalendar = true;
      const calendarListRef = ref(this.db, '/calendars');
      await push(calendarListRef, {
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
