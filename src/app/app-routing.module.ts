import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { MeComponent } from './me/me.component';
import { PremiumComponent } from './premium/premium.component';

const redirectLoggedInToCalendars = () => redirectLoggedInTo(['calendars']);
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'me',
    component: MeComponent
  },
  {
    path: 'calendars',
    component: CalendarsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: 'premium',
    component: PremiumComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'edit/:uid',
    component: EditCalendarComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome }
  },
  { path: 'preview', component: CalendarComponent },
  { path: ':uid', component: CalendarComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
