import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpecialRoutingModule } from './special-routing.module';
import { SpecialComponent } from './special.component';

@NgModule({
  declarations: [SpecialComponent],
  imports: [CommonModule, SpecialRoutingModule, SharedModule],
})
export class SpecialModule {}
