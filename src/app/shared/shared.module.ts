import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
];
//const customComponents = [];

//const customModules = [];

//const vendorModules = [];

@NgModule({
  //declarations: [...customComponents],
  declarations: [],
  imports: [
    ...materialModules,
    // ...vendorModules,
    // ...customModules,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // ...customComponents,
    ...materialModules,
    // ...vendorModules,
    // ...customModules,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
