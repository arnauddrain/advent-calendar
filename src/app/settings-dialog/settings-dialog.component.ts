import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Calendar } from '../calendar';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html'
})
export class SettingsDialogComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  name: string;

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { calendar: Calendar }) {
    this.name = data.calendar.name;
    if (data.calendar.startDate) {
      this.startDate = new Date(data.calendar.startDate);
    }
    if (data.calendar.endDate) {
      this.endDate = new Date(data.calendar.endDate);
    }
  }

  save() {
    this.dialogRef.close({
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
}
