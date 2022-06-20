import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IApiError } from 'src/app/shared/models/errors.model';
import { Role } from 'src/app/shared/models/role.model';
import { SalesDates } from 'src/app/shared/models/sales.model';
import { User } from 'src/app/shared/models/user.model';
import { DataApiService } from 'src/app/shared/services/api/data-api.service';
import { UserApiService } from 'src/app/shared/services/api/user-api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Sales } from './../../shared/models/sales.model';
import { DatesService } from './../../shared/services/dates.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss'],
})
export class SpecialComponent implements OnInit, OnDestroy {
  public user: User;
  public userFromApi: User;
  public datesForm: FormGroup;
  public chartConfig = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Date',
    showYAxisLabel: true,
    yAxisLabel: 'Color Value',
    timeline: true,
    autoScale: true,
  };

  public startDate: string;
  public endDate: string;

  public salesDates: Array<SalesDates>;
  private salesDatesCopy: Array<SalesDates>;

  private subscriptions: Array<Subscription> = [];

  get fc(): { [key: string]: AbstractControl } {
    return this.datesForm.controls;
  }

  get isAdmin() {
    return this.user.token && this.user.role === Role.Admin;
  }

  constructor(
    private userService: UserApiService,
    private authService: AuthService,
    private dataService: DataApiService,
    private datesService: DatesService,
    private fb: FormBuilder
  ) {
    this.user = this.authService.user;
    this.initForm();
  }

  public ngOnInit(): void {
    this.getUserData();
    this.getSalesDatesData();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  private initForm(): void {
    this.datesForm = this.fb.group({
      startDate: [undefined],
      days: [undefined],
    });
  }

  private getSalesDatesData(): void {
    this.subscriptions.push(
      this.dataService.getSalesDates().subscribe({
        next: (sales: Array<SalesDates>) => {
          this.salesDates = sales;
          this.salesDatesCopy = [...sales];
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

  public showChartWithDates(): void {
    const startDateSelected = this.fc['startDate'].value;
    this.startDate = this.datesService.formatDate(startDateSelected);
    const endDateAdd = new Date(
      this.datesService.addDays(
        startDateSelected,
        parseInt(this.fc['days'].value)
      )
    );
    this.endDate = this.datesService.formatDate(endDateAdd);

    let finalNewArray: Array<SalesDates> = [];
    let newArray: Array<Sales> = [];
    let newElementArray: SalesDates = {};

    this.salesDates.forEach((type: SalesDates) => {
      newElementArray.name = type.name;
      type.series?.forEach((elem: Sales) => {
        const dateParts = elem.name.split('/');
        const dateObject = new Date(
          +dateParts[2],
          Number(dateParts[1]) - 1,
          +dateParts[0]
        );

        if (
          dateObject >= new Date(startDateSelected) &&
          dateObject <= endDateAdd
        ) {
          newArray.push(elem);
        }
      });
      newElementArray.series = [...newArray];
      newArray = [];
      finalNewArray.push(newElementArray);
      newElementArray = {};
    });
    this.salesDates = [...finalNewArray];
  }

  public onSelect(event: Event) {
    console.log(event);
  }

  public orderByDefault(): void {
    this.salesDates = [...this.salesDatesCopy];
  }
}
