import { Component, Inject } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { Firestore, doc, DocumentReference, docData } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Calendar } from '../calendar';
import { Observable } from 'rxjs';
import { UserData } from '../user-data';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html'
})
export class SettingsDialogComponent {
  startDate = '';
  endDate = '';
  name: string;
  displayLogo = true;
  displayCta = true;
  userData: Observable<UserData | null> | null = null;
  user: User | null = null;
  premium = false;

  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { calendar: Calendar },
    private auth: Auth,
    private afs: Firestore
  ) {
    this.name = data.calendar.name;
    if (data.calendar.startDate) {
      this.startDate = data.calendar.startDate.substring(0, 10);
    }
    if (data.calendar.endDate) {
      this.endDate = data.calendar.endDate.substring(0, 10);
    }
    if (data.calendar.displayLogo === false) {
      this.displayLogo = data.calendar.displayLogo;
    }
    if (data.calendar.displayCta === false) {
      this.displayCta = data.calendar.displayCta;
    }

    user(this.auth).subscribe((user) => {
      if (user) {
        this.user = user;
        this.subscribeToUserData();
      }
    });
  }

  save() {
    this.dialogRef.close({
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      displayCta: this.displayCta,
      displayLogo: this.displayLogo
    });
  }

  private subscribeToUserData() {
    const userDataDoc = doc(this.afs, 'users/' + this.user?.uid);
    this.userData = docData<UserData>(userDataDoc as DocumentReference<UserData>);
    this.userData.subscribe((userData) => {
      this.premium = userData?.premium === true;
    });
  }
}
