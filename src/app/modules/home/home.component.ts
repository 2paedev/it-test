import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IApiError } from 'src/app/shared/models/errors.model';
import { User } from 'src/app/shared/models/user.model';
import { DataApiService } from 'src/app/shared/services/api/data-api.service';
import { UserApiService } from 'src/app/shared/services/api/user-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Sales } from './../../shared/models/sales.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public user: User;
  public userFromApi: User;
  public sales: Array<Sales>;
  public salesCopy: Array<Sales>;
  public editForm: FormGroup;

  private subscriptions: Array<Subscription> = [];

  get fc(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  constructor(
    private userService: UserApiService,
    private authService: AuthService,
    private dataService: DataApiService,
    private fb: FormBuilder
  ) {
    this.user = this.authService.user;
    this.initForm();
  }

  public ngOnInit(): void {
    this.getUserData();
    this.getSalesData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      name: [''],
      value: [''],
    });
  }

  private getSalesData(): void {
    this.subscriptions.push(
      this.dataService.getSales().subscribe({
        next: (sales: Array<Sales>) => {
          this.sales = sales;
          this.salesCopy = [...sales];
        },
        error: (error: IApiError) => {
          console.log(error);
        },
      })
    );
  }

  private getUserData(): void {
    if (this.user.token) {
      this.subscriptions.push(
        this.userService
          .getById(this.user.id)
          .pipe(first())
          .subscribe({
            next: (user: User) => {
              this.userFromApi = user;
            },
            error: (error: IApiError) => {
              console.log(error);
            },
          })
      );
    }
  }

  public addItem(): void {
    const newElement = [
      { name: this.fc['name'].value, value: this.fc['value'].value },
    ];
    this.sales = [...this.sales, ...newElement];
  }

  public orderByName(): void {
    const ordered = this.sales.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.sales = [...ordered];
  }

  public orderByValue(): void {
    const ordered = this.sales.sort((a, b) => (a.value > b.value ? 1 : -1));
    this.sales = [...ordered];
  }

  public orderByDefault(): void {
    this.sales = [...this.salesCopy];
  }
}
