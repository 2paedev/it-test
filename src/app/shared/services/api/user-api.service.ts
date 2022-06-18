import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/shared/const/api.const';
import { User } from 'src/app/shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Array<User>>(API.USER.BASE);
  }

  getById(id: number) {
    return this.http.get<User>(API.USER.BY_ID(id));
  }
}
