import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { IApiError } from 'src/app/shared/models/errors.model';
import { User } from 'src/app/shared/models/user.model';
import { UserApiService } from 'src/app/shared/services/api/user-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: User;
  userFromApi: User;

  constructor(
    private userService: UserApiService,
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    if (this.user.token) {
      this.userService
        .getById(this.user.id)
        .pipe(first())
        .subscribe({
          next: (user: User) => {
            this.userFromApi = user;
          },
          complete: () => {},
          error: (error: IApiError) => {
            console.log(error);
          },
        });
    }
  }
}
