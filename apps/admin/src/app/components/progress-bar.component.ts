import { UsersStore } from '@/core/store/users.store';
import { Component, effect, inject, untracked, viewChild } from '@angular/core';
import { NgProgressbar } from 'ngx-progressbar';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `<ng-progress #progress />`,
  imports: [NgProgressbar],
})
export class ProgressBarComponent {
  progressBar = viewChild(NgProgressbar);
  store = inject(UsersStore);

  loadingEffect = effect(() => {
    const isLoading = this.store.isLoading();
    console.log('isLoading', isLoading);
    untracked(() => {
      const progressBar = this.progressBar();
      if (isLoading) progressBar?.start();
      else progressBar?.complete();
    });
  });
}
