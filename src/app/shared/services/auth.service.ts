import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ILoginParams } from '../models/auth.model';
import { User } from '../models/user.model';
import { APP_ROUTES } from './../const/routes.const';
import { STORAGE } from './../const/storage-keys.const';
import { Role } from './../models/role.model';
import { AuthApiService } from './api/auth-api.service';

const DEFAULT_USER = {
  id: -1,
  firstName: '',
  lastName: '',
  username: '',
  role: Role.User,
  token: undefined,
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userSubject = new BehaviorSubject<User>(DEFAULT_USER);
  public $user: Observable<User>;

  constructor(private router: Router, private authApi: AuthApiService) {
    const userStorage = localStorage.getItem('user');

    if (userStorage) {
      this._userSubject = new BehaviorSubject<User>(JSON.parse(userStorage));
    }

    this.$user = this._userSubject.asObservable().pipe(shareReplay(1));
  }

  get user(): User {
    return this._userSubject.getValue();
  }

  set user(value: User) {
    this._userSubject.next(value);
  }

  public login(bodyParams: ILoginParams): Observable<User> {
    return this.authApi.login(bodyParams).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this._userSubject.next(user);
        return user;
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(STORAGE.KEYS.USER);
    this._userSubject.next(DEFAULT_USER);
    this.router.navigate([`/${APP_ROUTES.LOGIN}`]);
  }
}
