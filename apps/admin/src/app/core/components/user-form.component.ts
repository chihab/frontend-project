import { ButtonComponent } from '@/components/button.component';
import type { User } from '@/core/models/user.model';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export type UserData = Omit<User, 'id'>;

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="container mx-auto p-6">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">
          {{ isEditMode() ? 'Edit' : 'Create' }} User
        </h1>

        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div class="space-y-2">
            <label
              for="name"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              formControlName="name"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div class="space-y-2">
            <label
              for="email"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div class="space-y-2">
            <label
              for="roles"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Roles (comma-separated)
            </label>
            <input
              type="text"
              formControlName="roles"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div class="flex justify-end gap-4">
            <app-button type="button" (click)="onCancel()">Cancel</app-button>
            <app-button type="submit" [disabled]="userForm.invalid"
              >Save</app-button
            >
          </div>
        </form>
      </div>
    </div>
  `,
})
export class UserFormComponent {
  #fb = inject(FormBuilder);

  user = input<User | null>(null);
  edit = output<UserData>();
  cancel = output<void>();

  userForm: FormGroup = this.#fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email]],
    roles: ['', Validators.required],
  });

  isEditMode = computed(() => !!this.user());

  constructor() {
    effect(() => {
      const user = this.user();
      if (user) {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          roles: user.roles.join(', '),
        });
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const userData: UserData = {
        name: formValue.name,
        email: formValue.email,
        roles: formValue.roles.split(',').map((role: string) => role.trim()),
      };
      this.edit.emit(userData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
