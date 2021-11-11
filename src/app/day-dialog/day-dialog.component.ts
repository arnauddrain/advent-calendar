import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { FileService } from '../file.service';

@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.css']
})
export class DayDialogComponent {
  text?: SafeHtml;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { filename: string },
    private sanitizer: DomSanitizer,
    private fileService: FileService
  ) {
    this.loading = true;
    this.fileService
      .get(data.filename)
      .pipe(
        take(1),
        catchError(() => of(''))
      )
      .subscribe((content) => {
        this.loading = false;
        this.text = this.sanitizer.bypassSecurityTrustHtml(content || "<i>Le père noël n'est pas encore passé par là...");
      });
  }
}
