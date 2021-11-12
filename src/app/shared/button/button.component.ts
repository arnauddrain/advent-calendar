import { Component, Input } from '@angular/core';
import { Size } from '../sizes';
import { Theme } from '../theme';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  host: { class: 'flex' }
})
export class ButtonComponent {
  @Input() theme: Theme = 'transparent';
  @Input() type = '';
  @Input() size: Size = 'normal';
}
