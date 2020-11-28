import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-day-dialog',
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.css']
})
export class DayDialogComponent {
  text: SafeHtml;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { text: string },
    private sanitizer: DomSanitizer
  ) {
    this.text = this.sanitizer.bypassSecurityTrustHtml(data.text ?? '<i>Le père noël n\'est pas encore passé par là...');
  }

}
