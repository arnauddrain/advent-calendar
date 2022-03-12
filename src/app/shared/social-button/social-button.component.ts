import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-social-button',
  templateUrl: 'social-button.component.html'
})
export class SocialButtonComponent {
  @HostBinding('attr.class') class = 'flex';

  @Input() theme: 'white' | 'blue' | 'transparent' | 'black' = 'white';
  @Input() img?: string;
  @Input() disabled = false;
}
