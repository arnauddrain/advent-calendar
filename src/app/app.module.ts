import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';
import { HomeComponent } from './home/home.component';

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
    DeleteCalendarDialogComponent,
    SettingsDialogComponent,
    HomeComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
