import { Component } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent {
  constructor(private analytics: Analytics) {}

  donationEvent() {
    logEvent(this.analytics, 'Click on donation');
  }

  contactEvent() {
    logEvent(this.analytics, 'Click on contact');
  }
}
