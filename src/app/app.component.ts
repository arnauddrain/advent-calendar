import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user: firebase.User | null = null;

  constructor(public router: Router, private analytics: AngularFireAnalytics, public auth: AngularFireAuth) {
    auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  donationEvent() {
    this.analytics.logEvent('Click on donation');
  }

  contactEvent() {
    this.analytics.logEvent('Click on contact');
  }
}
