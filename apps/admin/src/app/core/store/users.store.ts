import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

type UsersState = {
  users: User[];
  user: User | null;
  isLoading: boolean;
  error: string;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: UsersState = {
  users: [],
  user: null,
  isLoading: false,
  error: '',
  filter: { query: '', order: 'asc' },
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, usersService = inject(UserService)) => ({
    editUser(id: string): void {
      const user = store.users().find((u) => u.id === id) || null;
      patchState(store, { user });
    },
    async getUsers(): Promise<void> {
      try {
        if (store.users().length) {
          return;
        }
        patchState(store, { isLoading: true });
        const users = await usersService.getUsers();
        patchState(store, { users, isLoading: false });
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        patchState(store, { error: errorMessage, isLoading: false });
      }
    },
    async getUserById(id: string): Promise<void> {
      try {
        if (store.user()?.id === id) {
          return;
        }
        patchState(store, { isLoading: true });
        const user = await usersService.getUserById(id);
        patchState(store, { user, isLoading: false });
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        patchState(store, { error: errorMessage, isLoading: false });
      }
    },
    async addUser(user: Omit<User, 'id'>): Promise<void> {
      const prevUsers = store.users();
      try {
        patchState(store, { isLoading: true });
        // TODO: Optimistic update
        const newUser = await usersService.addUser(user);
        patchState(store, {
          users: [...store.users(), newUser],
          isLoading: false,
        });
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        patchState(store, {
          users: prevUsers,
          error: errorMessage,
          isLoading: false,
        });
      }
    },
    async updateUser(user: User): Promise<void> {
      const prevUsers = store.users();
      try {
        const optimisticUsers = store
          .users()
          .map((u) => (u.id === user.id ? user : u));
        patchState(store, { users: optimisticUsers, isLoading: true });
        await usersService.updateUser(user);
        patchState(store, { isLoading: false });
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        patchState(store, {
          users: prevUsers,
          error: errorMessage,
          isLoading: false,
        });
      }
    },
    async deleteUser(id: string): Promise<void> {
      const prevUsers = store.users();
      try {
        const users = store.users().filter((user) => user.id !== id);
        patchState(store, { users, isLoading: true });
        await usersService.deleteUser(id);
        patchState(store, { isLoading: false });
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        patchState(store, {
          users: prevUsers,
          error: errorMessage,
          isLoading: false,
        });
      }
    },
  }))
);
