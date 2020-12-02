import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.css']
})
export class CalendarsComponent {
  isLoading = true;
  newCalendarName: string = '';
  calendars: Observable<any[]> | null;
  user: firebase.User | null = null;
  addingCalendar = false;

  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    private bottomSheet: MatBottomSheet,
    private analytics: AngularFireAnalytics
  ) {
    this.calendars = null;
    auth.user.subscribe((user) => {
      this.isLoading = false;
      this.user = user;
      this.calendars = this.db.list('/calendars', ref =>
        ref.orderByChild('author').equalTo(this.user?.uid ?? '')
      ).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
        )
      );
    });
  }

  async addCalendar() {
    if (this.user && !this.addingCalendar) {
      this.analytics.logEvent('Create calendar');
      this.addingCalendar = true;
      await this.db.list('/calendars').push({
        name: this.newCalendarName,
        author: this.user.uid
      });
      this.newCalendarName = '';
      this.addingCalendar = false;
    }
  }

  login() {
    this.analytics.logEvent('Login');
    this.analytics.logEvent('Login via Google');
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  fbLogin() {
    this.analytics.logEvent('Login');
    this.analytics.logEvent('Login via Facebook');
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch((e) => {
      if (e.code === 'auth/account-exists-with-different-credential') {
        this.analytics.logEvent('Error with login via Facebook');
        this.bottomSheet.open(BottomSheetComponent, {
          data: {
            text: 'Cet email est déjà associé à un autre compte, essayez de vous connecter avec Google'
          }
        });
      }
      console.log(e);
    });
  }

  logout() {
    this.analytics.logEvent('Logout');
    this.auth.signOut();
  }
}
