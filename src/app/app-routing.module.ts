import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';

const routes: Routes = [
  { path: '', component: CalendarsComponent },
  { path: 'edit/:uid', component: EditCalendarComponent, canActivate: [AngularFireAuthGuard] },
  { path: ':uid', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
