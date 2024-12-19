import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRequestRoutingModule } from './list-request-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ListRequestComponent } from './list-request.component';


@NgModule({
  declarations: [
    ListRequestComponent
  ],
  imports: [
    CommonModule,
    ListRequestRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ListRequestModule { }
