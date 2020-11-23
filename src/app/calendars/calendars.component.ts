import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
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
  calendarsRef: AngularFireList<any>;
  newCalendarName: string = '';
  calendars: Observable<any[]> | null;
  user: firebase.User | null = null;

  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    this.calendars = null;
    this.calendarsRef = this.db.list('calendars');
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

  addCalendar() {
    if (this.user) {
      this.db.list('/calendars').push({
        name: this.newCalendarName,
        author: this.user.uid
      });
    }
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
