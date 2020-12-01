import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { DayDialogComponent } from '../day-dialog/day-dialog.component';
import { FileService } from '../file.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendar: any = null;
  uid: string;
  demo = false;

  constructor(
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fileService: FileService
  ) {
    this.uid = this.route.snapshot.paramMap.get('uid') ?? '';
    this.db.object('calendars/' + this.uid).valueChanges().subscribe((val: any) => {
      this.calendar = val;
      this.demo = val?.demo ?? false;
    });
  }

  open(index: number) {
    const filename = this.calendar.author + '/calendars/' + this.uid + '/' + index + '.html';
    this.fileService.get(filename).pipe(take(1), catchError(() => of(''))).subscribe(content => {
      this.dialog.open(DayDialogComponent, {
        data: {
          text: content
        }
      })
    });
  }
}
