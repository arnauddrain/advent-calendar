import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public router: Router,
    private analytics: AngularFireAnalytics
  ) { }

  event() {
    this.analytics.logEvent('Click on donation');
  }
}
