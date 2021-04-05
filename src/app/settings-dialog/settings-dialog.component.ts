import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { calendar: any }) {
    if (data.calendar.startDate) {
      this.startDate = data.calendar.startDate;
    }
    if (data.calendar.endDate) {
      this.endDate = data.calendar.endDate;
    }
  }

  save() {
    this.dialogRef.close({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
}
