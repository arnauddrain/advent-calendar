import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendar: any = null;

  constructor(
    public db: AngularFireDatabase,
    private route: ActivatedRoute
  ) {
    const uuid = this.route.snapshot.paramMap.get('uid');
    this.db.object('calendars/' + uuid).valueChanges().subscribe(val => {
      this.calendar = val;
    });
  }
}
