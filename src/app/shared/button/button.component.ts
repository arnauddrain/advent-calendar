import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  host: { class: 'flex' }
})
export class ButtonComponent {
  @Input() theme: 'white' | 'blue' | 'transparent' | 'black' = 'white';
  @Input() img?: string;
}
