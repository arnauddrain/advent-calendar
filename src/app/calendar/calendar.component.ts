import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '../calendar';

import { DayDialogComponent } from '../day-dialog/day-dialog.component';
import { FileService } from '../file.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  loading = true;
  calendar: Calendar | null = null;
  uid: string;
  demo = false;

  constructor(public db: AngularFireDatabase, private route: ActivatedRoute, private dialog: MatDialog, private fileService: FileService) {
    this.uid = this.route.snapshot.paramMap.get('uid') ?? '';
    this.db
      .object<Calendar>('calendars/' + this.uid)
      .valueChanges()
      .subscribe((val: Calendar | null) => {
        this.loading = false;
        this.calendar = val;
        this.demo = val?.demo ?? false;
      });
  }

  open(index: number) {
    if (this.calendar) {
      const filename = this.calendar.author + '/calendars/' + this.uid + '/' + index + '.html';
      this.dialog.open(DayDialogComponent, {
        data: {
          filename: filename
        }
      });
    }
  }
}
