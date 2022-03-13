import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-social-button',
  templateUrl: 'social-button.component.html'
})
export class SocialButtonComponent {
  @Input() theme: 'white' | 'blue' | 'transparent' | 'black' = 'white';
  @Input() img?: string;
  @Input() disabled = false;
}
