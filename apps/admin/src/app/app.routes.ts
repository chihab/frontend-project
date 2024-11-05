import { Routes } from '@angular/router';
import {
  userByIdResolver /*, userResolver*/,
  usersResolver,
} from './core/services/user.resolve';
import { NotFoundPageComponent } from './pages/not-found-page.component';

const loadUserFormComponent = () =>
  import('./pages/user-form-page.component').then(
    (m) => m.UserFormPageComponent
  );

export const appRoutes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user-list-page/user-list-page.component').then(
        (m) => m.UserListPageComponent
      ),
    resolve: {
      users: usersResolver,
    },
  },
  { path: 'users/new', loadComponent: loadUserFormComponent },
  {
    path: 'users/:userId',
    loadComponent: loadUserFormComponent,
    resolve: {
      user: userByIdResolver,
    },
  },
  { path: '**', component: NotFoundPageComponent },
];
