import { Component } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';

@Component({
  selector: 'app-me',
  template: '<p>Bonjour</p><p *ngIf="user">Email : {{ user.email }}</p><p *ngIf="user">Nom complet : {{ user.displayName }}</p><p *ngIf="user">Uid : {{ user.uid }}</p>'
})
export class MeComponent {
  user: User | null = null;

  constructor(private auth: Auth) {
    user(this.auth).subscribe((user) => {
      this.user = user;
    });
  }
}
