import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';

const routes: Routes = [
  { path: '', component: CalendarsComponent },
  { path: 'edit/:uuid', component: EditCalendarComponent },
  { path: ':uuid', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
