import { Component, Inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { FileService } from '../file.service';
import { Auth, user, User } from '@angular/fire/auth';
import { Firestore, doc, DocumentReference, docData } from '@angular/fire/firestore';
import { UserData } from '../user-data';
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
  userData: Observable<UserData | null> | null = null;
  user: User | null = null;
  premium = false;

  constructor(
    public dialogRef: MatDialogRef<DayEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filename: string },
    private fileService: FileService,
    private analytics: Analytics,
    private auth: Auth,
    private afs: Firestore
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

    user(this.auth).subscribe((user) => {
      if (user) {
        this.user = user;
        this.subscribeToUserData();
      }
    });
  }

  async save() {
    if (!this.text || (this.text.length >= 2000000 && !this.premium)) {
      return;
    }
    this.saving = true;
    logEvent(this.analytics, 'Save day');
    await this.fileService.upload(this.filename, this.text);
    this.dialogRef.close(this.text);
    this.saving = false;
  }

  private subscribeToUserData() {
    const userDataDoc = doc(this.afs, 'users/' + this.user?.uid);
    this.userData = docData<UserData>(userDataDoc as DocumentReference<UserData>);
    this.userData.subscribe((userData) => {
      this.premium = userData?.premium === true;
    });
  }
}
