import { ButtonComponent } from '@/components/button.component';
import { User } from '@/core/models/user.model';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="rounded-md border">
      <table class="w-full">
        <thead>
          <tr class="border-b bg-muted/50">
            <th class="h-12 px-4 text-left align-middle font-medium">ID</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Name</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Email</th>
            <th class="h-12 px-4 text-left align-middle font-medium">Roles</th>
            <th class="h-12 px-4 text-left align-middle font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          @for(user of users(); track user.id) {
          <tr class="border-b">
            <td class="p-4">{{ user.id }}</td>
            <td class="p-4">{{ user.name }}</td>
            <td class="p-4">{{ user.email || '-' }}</td>
            <td class="p-4">{{ user.roles.join(', ') }}</td>
            <td class="p-4">
              <div class="flex gap-2">
                <app-button (click)="edit.emit(user.id)"> Edit </app-button>
                <app-button
                  variant="destructive"
                  (click)="delete.emit(user.id)"
                >
                  Delete
                </app-button>
              </div>
            </td>
          </tr>
          } @if(users()?.length === 0) {
          <tr>
            <td colspan="5" class="p-8 text-center text-muted-foreground">
              No users found
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class UserListComponent {
  users = input<User[] | null>();
  delete = output<string>();
  edit = output<string>();
}
