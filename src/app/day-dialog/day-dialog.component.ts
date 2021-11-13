import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { FileService } from '../file.service';

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.css']
})
export class DayDialogComponent {
  text?: string;
  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { filename: string }, private fileService: FileService) {
    this.loading = true;
    this.fileService
      .get(data.filename)
      .pipe(
        take(1),
        catchError(() => of(''))
      )
      .subscribe((content) => {
        this.loading = false;
        this.text = content;
      });
  }
}
