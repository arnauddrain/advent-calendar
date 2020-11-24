import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.css']
})
export class DayDialogComponent {
  text: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {
    this.text = data.text;
  }

}
