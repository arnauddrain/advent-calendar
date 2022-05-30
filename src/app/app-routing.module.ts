import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'calendars',
    component: CalendarsComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'edit/:uid',
    component: EditCalendarComponent
  },
  { path: 'preview', component: CalendarComponent },
  { path: ':uid', component: CalendarComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
