import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-day-edit-dialog',
  templateUrl: './day-edit-dialog.component.html',
  styleUrls: ['./day-edit-dialog.component.css']
})
export class DayEditDialogComponent {
  text: string;
  preview: boolean = false;

  constructor(public dialogRef: MatDialogRef<DayEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { text: string }) {
    this.text = data.text;
  }

  save() {
    if (this.text.length >= 2000000) {
      return;
    }
    this.dialogRef.close(this.text);
  }
}
