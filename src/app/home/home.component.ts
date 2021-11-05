import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private auth: AngularFireAuth,
    private bottomSheet: MatBottomSheet,
    private analytics: AngularFireAnalytics,
    private router: Router
  ) {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['calendars']);
      }
    });
  }

  async login() {
    this.analytics.logEvent('Login');
    this.analytics.logEvent('Login via Google');
    await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['calendars']);
  }

  async fbLogin() {
    this.analytics.logEvent('Login');
    this.analytics.logEvent('Login via Facebook');
    try {
      await this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    } catch (e: any) {
      if (e.code === 'auth/account-exists-with-different-credential') {
        this.analytics.logEvent('Error with login via Facebook');
        this.bottomSheet.open(BottomSheetComponent, {
          data: {
            text: 'Cet email est déjà associé à un autre compte, essayez de vous connecter avec Google'
          }
        });
      }
      return;
    }
    this.router.navigate(['calendars']);
  }
}
