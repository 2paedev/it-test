import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, CustomHttpOptions } from '../../const/api.const';
import { ILoginParams } from '../../models/auth.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  public login(bodyParams: ILoginParams): Observable<User> {
    return this.http.post<User>(API.AUTH.LOGIN, bodyParams, CustomHttpOptions);
  }
}
