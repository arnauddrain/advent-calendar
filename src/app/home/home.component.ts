import { Component } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Auth, user, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private auth: Auth, private bottomSheet: MatBottomSheet, private analytics: Analytics, private router: Router) {
    user(this.auth).subscribe((user) => {
      if (user) {
        this.router.navigate(['calendars']);
      }
    });
  }

  async login() {
    logEvent(this.analytics, 'Login');
    logEvent(this.analytics, 'Login via Google');
    await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.router.navigate(['calendars']);
  }

  async fbLogin() {
    logEvent(this.analytics, 'Login');
    logEvent(this.analytics, 'Login via Facebook');
    try {
      await signInWithPopup(this.auth, new FacebookAuthProvider());
    } catch (e: any) {
      if (e.code === 'auth/account-exists-with-different-credential') {
        logEvent(this.analytics, 'Error with login via Facebook');
        this.bottomSheet.open(BottomSheetComponent, {
          data: {
            text: 'Cet email est déjà associé à un autre compte, essayez de vous connecter avec Google'
          }
        });
      } else {
        throw e;
      }
      return;
    }
    this.router.navigate(['calendars']);
  }
}
