import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';

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
import { HttpClientModule } from '@angular/common/http';
import { DeleteCalendarDialogComponent } from './delete-calendar-dialog/delete-calendar-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarsComponent,
    CalendarComponent,
    EditCalendarComponent,
    BottomSheetComponent,
    DayDialogComponent,
    CalendarContentComponent,
    DayEditDialogComponent,
    DeleteCalendarDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatDialogModule,
    ClipboardModule,
    MatSlideToggleModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
