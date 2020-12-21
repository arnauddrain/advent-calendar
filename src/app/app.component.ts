import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: firebase.User | null = null;

  constructor(
    public router: Router,
    private analytics: AngularFireAnalytics,
    public auth: AngularFireAuth
  ) {
    auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  event() {
    this.analytics.logEvent('Click on donation');
  }

  eventUser() {
    this.analytics.logEvent('Click on donation user');
  }
}
