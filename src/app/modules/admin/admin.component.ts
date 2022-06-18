import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { IApiError } from 'src/app/shared/models/errors.model';
import { User } from 'src/app/shared/models/user.model';
import { UserApiService } from 'src/app/shared/services/api/user-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService: UserApiService) {}

  public ngOnInit(): void {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe({
        next: (users: Array<User>) => {
          this.users = users;
        },
        complete: () => {},
        error: (error: IApiError) => {
          console.log(error);
        },
      });
  }
}
