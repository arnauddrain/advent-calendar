import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent {
  constructor(private analytics: AngularFireAnalytics) {}

  donationEvent() {
    this.analytics.logEvent('Click on donation');
  }

  contactEvent() {
    this.analytics.logEvent('Click on contact');
  }
}
