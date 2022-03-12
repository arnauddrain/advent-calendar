import { Component, HostBinding, Input } from '@angular/core';
import { Size } from '../sizes';
import { Theme } from '../theme';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html'
})
export class ButtonComponent {
  @HostBinding('attr.class') class = 'flex';

  @Input() theme: Theme = 'transparent';
  @Input() type = '';
  @Input() size: Size = 'normal';
}
