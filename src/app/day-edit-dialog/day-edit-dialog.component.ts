import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Quill from 'quill';

import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize)

@Component({
  selector: 'app-day-edit-dialog',
  templateUrl: './day-edit-dialog.component.html',
  styleUrls: ['./day-edit-dialog.component.css']
})
export class DayEditDialogComponent {
  text: string;
  modules = {
    imageResize: {}
  };

  constructor(
    public dialogRef: MatDialogRef<DayEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {
    this.text = data.text;
  }

  save() {
    if (this.text.length >= 1000000) {
      return;
    }
    this.dialogRef.close(this.text);
  }
}
