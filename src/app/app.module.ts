import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
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
import { MediaResize } from 'quill-media-resize';
import * as Sentry from '@sentry/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

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
import { DeleteCalendarDialogComponent } from './delete-calendar-dialog/delete-calendar-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { CustomDateAdapter } from './custom-date-adapter';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ButtonComponent } from './shared/button/button.component';
import { AddCalendarDialogComponent } from './add-calendar-dialog/add-calendar-dialog.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SocialButtonComponent } from './shared/social-button/social-button.component';
import { BypassPipe } from './shared/bypass.pipe';

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
    HomeComponent,
    NotFoundComponent,
    ButtonComponent,
    AddCalendarDialogComponent,
    SpinnerComponent,
    TopBarComponent,
    SocialButtonComponent,
    BypassPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
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
    QuillModule.forRoot({
      customModules: [
        {
          implementation: MediaResize,
          path: 'modules/MediaResize'
        }
      ],
      modules: {
        MediaResize: true
      },
      placeholder: 'Écrivez quelque chose...',
      suppressGlobalRegisterWarning: true
    })
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false
      })
    },
    {
      provide: Sentry.TraceService,
      deps: [Router]
    },
    ScreenTrackingService,
    UserTrackingService,
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
