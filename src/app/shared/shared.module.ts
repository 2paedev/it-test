import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

const vendorModules = [NgxChartsModule];

@NgModule({
  imports: [
    ...materialModules,
    ...vendorModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...materialModules, ...vendorModules, ReactiveFormsModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class SharedModule {}
