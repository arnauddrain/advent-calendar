import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.analytics.logEvent('Logout');
    this.auth.signOut();
  }
}
