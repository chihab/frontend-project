import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgressBarComponent } from './components/progress-bar.component';

@Component({
  standalone: true,
  imports: [RouterModule, ProgressBarComponent],
  selector: 'app-root',
  template: `<app-progress-bar /><router-outlet />`,
})
export class AppComponent {}
