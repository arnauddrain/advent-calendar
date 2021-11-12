import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  host: { class: 'flex' }
})
export class ButtonComponent {
  @Input() theme: 'danger' | 'success' | 'transparent' = 'transparent';
  @Input() href = '';
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
}
