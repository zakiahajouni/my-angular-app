import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRequestRoutingModule } from './list-request-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListRequestComponent } from './list-request.component';


@NgModule({
  declarations: [
    ListRequestComponent
  ],
  imports: [
    CommonModule,
    ListRequestRoutingModule,
    SharedModule
  ]
})
export class ListRequestModule { }
