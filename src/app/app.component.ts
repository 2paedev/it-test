import { Component } from '@angular/core';
import { IApiError } from './shared/models/errors.model';
import { Role } from './shared/models/role.model';
import { User } from './shared/models/user.model';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: User;

  get isAdmin() {
    return this.user.token && this.user.role === Role.Admin;
  }

  constructor(private authService: AuthService) {
    this.authService.$user.subscribe({
      next: (newUserValue: User) => (this.user = newUserValue),
      error: (error: IApiError) => {
        console.log(error);
      },
    });
  }

  public logout(): void {
    this.authService.logout();
  }
}
