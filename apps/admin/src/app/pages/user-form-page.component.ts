import { ButtonComponent } from '@/components/button.component';
import {
  type UserData,
  UserFormComponent,
} from '@/core/components/user-form.component';
import { User } from '@/core/models/user.model';
// import { UserService } from '@/core/services/user.service';
import { UsersStore } from '@/core/store/users.store';
// import { invalidateQuery } from '@/utils/query-client';
import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    UserFormComponent,
  ],
  template: `
    <div class="container mx-auto p-6">
      <div class="max-w-2xl mx-auto">
        <app-user-form
          [user]="user()"
          (edit)="onSubmit($event)"
          (cancel)="onCancel()"
        />
        @if(store.error()){
        <p class="text-primary">Error {{ store.error() }}</p>
        }
      </div>
    </div>
  `,
})
export class UserFormPageComponent {
  // #userService = inject(UserService);
  #router = inject(Router);

  store = inject(UsersStore);
  user = input<User | null>(null);
  userId = input<string>();

  onSubmit(userData: UserData) {
    const userId = this.userId();
    if (userId) {
      this.store.updateUser({ id: userId, ...userData });
    } else {
      this.store.addUser(userData);
    }
    this.goBack();
  }

  onCancel() {
    this.goBack();
  }

  goBack() {
    this.#router.navigate(['/users']);
  }
}
