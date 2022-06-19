export interface Sales {
  name: string;
  value: number;
}

export interface SalesDates {
  name?: string;
  series?: Array<Sales>;
}
