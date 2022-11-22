import { Component, Inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Calendar } from '../calendar';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html'
})
export class ShareDialogComponent {
  uid: string;
  url: string;
  iframe: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { uid: string }, private bottomSheet: MatBottomSheet) {
    this.uid = data.uid;
    this.url = window.location.origin + '/' + this.uid;
    this.iframe = '<iframe width="900" height="1200" src="' + this.url + '"></iframe>';
  }

  copy() {
    this.bottomSheet.open(BottomSheetComponent, {
      data: {
        text: 'Le lien a été copié dans le presse-papier !'
      }
    });
  }
}
