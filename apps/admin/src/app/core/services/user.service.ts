import { User } from '@/core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, lastValueFrom } from 'rxjs';

const DELAY = 3000;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #http = inject(HttpClient);
  #apiUrl = 'http://localhost:3000/users';

  getUsers() {
    return lastValueFrom(
      this.#http.get<User[]>(this.#apiUrl).pipe(delay(DELAY))
    );
  }

  getUserById(id: string) {
    return lastValueFrom(
      this.#http.get<User>(`${this.#apiUrl}/${id}`).pipe(delay(DELAY))
    );
  }

  addUser(user: Omit<User, 'id'>) {
    return lastValueFrom(
      this.#http.post<User>(this.#apiUrl, user).pipe(delay(DELAY))
    );
  }

  updateUser(user: User) {
    return lastValueFrom(
      this.#http
        .put<User>(`${this.#apiUrl}/${user.id}`, user)
        .pipe(delay(DELAY))
    );
  }

  deleteUser(id: string) {
    return lastValueFrom(
      this.#http.delete<void>(`${this.#apiUrl}/${id}`).pipe(delay(DELAY))
    );
  }
}
