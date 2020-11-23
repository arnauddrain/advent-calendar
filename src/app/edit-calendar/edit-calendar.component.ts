import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrls: ['./edit-calendar.component.css']
})
export class EditCalendarComponent {
  calendar: any = null;

  constructor(
    public db: AngularFireDatabase,
    private route: ActivatedRoute
  ) {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    this.db.object('calendars/' + uuid).valueChanges().subscribe(val => {
      this.calendar = val;
    });
  }
}
