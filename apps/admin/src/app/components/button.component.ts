import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

type ButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
    >
      <ng-content></ng-content>
    </button>
  `,
  imports: [NgClass],
})
export class ButtonComponent {
  type = input<ButtonType>('button');
  disabled = input<boolean>(false);
  class = input<string>();
}
