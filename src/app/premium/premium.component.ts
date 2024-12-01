import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { Firestore, doc, DocumentReference } from '@angular/fire/firestore';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { docData } from 'rxfire/firestore';
import { UserData } from '../user-data';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html'
})
export class PremiumComponent {
  userData: Observable<UserData | null> | null = null;
  user: User | null = null;
  stripeLink = environment.stripeLink;
  premium = false;

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: string,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.updateTag({
      name: 'premium',
      content: "Activez le mode premium pour accéder à des fonctionnalités exclusives et soutenir le développement de l'application."
    });
    this.title.setTitle("eCalendrier - Calendrier de l'avent en ligne");
    if (isPlatformBrowser(platformId)) {
      user(this.auth).subscribe((user) => {
        if (!user) {
          this.router.navigate(['/']);
        } else {
          this.user = user;
          this.subscribeToUserData();
        }
      });
    }
  }

  private subscribeToUserData() {
    const userDataDoc = doc(this.afs, 'users/' + this.user?.uid);
    this.userData = docData<UserData>(userDataDoc as DocumentReference<UserData>);
    this.userData.subscribe((userData) => {
      this.premium = userData?.premium === true;
    });
  }
}
