import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatesService {
  constructor() {}

  private padTo2Digits(num: any): any {
    return num.toString().padStart(2, '0');
  }

  public formatDate(date: any): any {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  public addDays(date: string, days: any): any {
    const dateSelected = new Date(date);
    return dateSelected.setDate(dateSelected.getDate() + days);
  }
}
