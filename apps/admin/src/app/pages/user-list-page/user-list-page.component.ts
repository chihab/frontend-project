import { ButtonComponent } from '@/components/button.component';
import { UserListComponent } from '@/core/components/user-list.component';
// import { UserService } from '@/core/services/user.service';
// import { createQuery } from '@/utils/query-client';
import { UsersStore } from '@/core/store/users.store';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list-page',
  standalone: true,
  imports: [UserListComponent, RouterLink, ButtonComponent],
  template: `
    <div class="container mx-auto p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Users</h1>
        <app-button routerLink="/users/new">Add User</app-button>
      </div>
      <app-user-list
        [users]="store.users()"
        (delete)="onDelete($event)"
        (edit)="onEdit($event)"
      />
      @if(store.error()){
      <p class="text-primary">Error {{ store.error() }}</p>
      }
    </div>
  `,
})
export class UserListPageComponent {
  // readonly #userService = inject(UserService);
  readonly store = inject(UsersStore);
  readonly #router = inject(Router);

  // usersQuery = createQuery('users', () => this.#userService.getUsers());

  onEdit(id: string) {
    // Used with query-client
    this.store.editUser(id);
    this.#router.navigate(['/users', id]);
  }

  onDelete(id: string) {
    this.store.deleteUser(id);
    // Used with query-client
    // await this.#userService.deleteUser(id);
    // this.usersQuery.invalidate(); // Invalidate the query to refetch the data
  }
}
