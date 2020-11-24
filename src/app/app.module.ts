import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CalendarsComponent } from './calendars/calendars.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { DayDialogComponent } from './day-dialog/day-dialog.component';
import { CalendarContentComponent } from './calendar-content/calendar-content.component';
import { DayEditDialogComponent } from './day-edit-dialog/day-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarsComponent,
    CalendarComponent,
    EditCalendarComponent,
    BottomSheetComponent,
    DayDialogComponent,
    CalendarContentComponent,
    DayEditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatDialogModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
