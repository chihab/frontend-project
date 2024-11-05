import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
// import { UserService } from './user.service';
import { UsersStore } from '../store/users.store';

// export const userResolver = (route: ActivatedRouteSnapshot) => {
//   const userId = route.paramMap.get('userId');
//   if (userId) {
//     const userService = inject(UserService);
//     return userService.getUserById(userId);
//   } else {
//     return null;
//   }
// };

export const usersResolver = async () => {
  const usersStore = inject(UsersStore);
  await usersStore.getUsers();
};

export const userByIdResolver = async (route: ActivatedRouteSnapshot) => {
  const userId = route.paramMap.get('userId');
  const usersStore = inject(UsersStore);
  if (userId) {
    await usersStore.getUserById(userId);
    return usersStore.user();
  }
  return null;
};
