import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sales } from '../../models/sales.model';
import { SalesDates } from './../../models/sales.model';

@Injectable({ providedIn: 'root' })
export class DataApiService {
  constructor(private http: HttpClient) {}

  getSales() {
    return this.http.get<Array<Sales>>('assets/data/sales.json');
  }

  getSalesDates() {
    return this.http.get<Array<SalesDates>>('assets/data/sales-dates.json');
  }
}
