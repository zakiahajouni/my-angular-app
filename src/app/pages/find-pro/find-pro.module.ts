import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindProRoutingModule } from './find-pro-routing.module';
import { FindProComponent } from './find-pro.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FindProComponent
  ],
  imports: [
    CommonModule,
    FindProRoutingModule,
    SharedModule
  ]
})
export class FindProModule { }
