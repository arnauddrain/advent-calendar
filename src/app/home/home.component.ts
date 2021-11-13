import { Component } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Auth, user, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { signInWithRedirect } from '@firebase/auth';

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

  async loginViaRedirect(provider: typeof GoogleAuthProvider | typeof FacebookAuthProvider) {
    await signInWithRedirect(this.auth, new provider());
    this.router.navigate(['calendars']);
  }

  private checkForCommonError(e: any, provider: typeof GoogleAuthProvider | typeof FacebookAuthProvider) {
    if (e.code === 'auth/popup-blocked') {
      this.loginViaRedirect(provider);
      return true;
    }
    return ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(e.code);
  }

  async login() {
    logEvent(this.analytics, 'Login');
    logEvent(this.analytics, 'Login via Google');
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.router.navigate(['calendars']);
    } catch (e: any) {
      if (this.checkForCommonError(e, GoogleAuthProvider)) {
        return;
      }
      throw e;
    }
  }

  async fbLogin() {
    logEvent(this.analytics, 'Login');
    logEvent(this.analytics, 'Login via Facebook');
    try {
      await signInWithPopup(this.auth, new FacebookAuthProvider());
      this.router.navigate(['calendars']);
    } catch (e: any) {
      if (this.checkForCommonError(e, FacebookAuthProvider)) {
        return;
      }
      if (e.code === 'auth/account-exists-with-different-credential') {
        logEvent(this.analytics, 'Error with login via Facebook');
        this.bottomSheet.open(BottomSheetComponent, {
          data: {
            text: 'Cet email est déjà associé à un autre compte, essayez de vous connecter avec Google'
          }
        });
        return;
      }
      throw e;
    }
  }
}
