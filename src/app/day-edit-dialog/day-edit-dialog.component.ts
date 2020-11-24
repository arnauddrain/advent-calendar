import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-day-edit-dialog',
  templateUrl: './day-edit-dialog.component.html',
  styleUrls: ['./day-edit-dialog.component.css']
})
export class DayEditDialogComponent {
  text: string;

  constructor(
    public dialogRef: MatDialogRef<DayEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {
    this.text = data.text;
  }

}
