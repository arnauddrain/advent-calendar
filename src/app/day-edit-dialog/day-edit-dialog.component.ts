import { Component, Inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { FileService } from '../file.service';
@Component({
  selector: 'app-day-edit-dialog',
  templateUrl: './day-edit-dialog.component.html',
  styleUrls: ['./day-edit-dialog.component.css']
})
export class DayEditDialogComponent {
  text?: string;
  preview: boolean = false;
  filename: string;
  saving = false;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DayEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filename: string },
    private fileService: FileService,
    private analytics: Analytics
  ) {
    this.loading = true;
    this.filename = data.filename;
    this.fileService
      .get(this.filename)
      .pipe(
        take(1),
        catchError(() => of(''))
      )
      .subscribe((content) => {
        this.loading = false;
        this.text = content;
      });
  }

  async save() {
    if (!this.text || this.text.length >= 2000000) {
      return;
    }
    this.saving = true;
    logEvent(this.analytics, 'Save day');
    await this.fileService.upload(this.filename, this.text);
    this.dialogRef.close(this.text);
    this.saving = false;
  }
}
