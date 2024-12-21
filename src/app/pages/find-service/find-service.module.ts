import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindServiceRoutingModule } from './find-service-routing.module';
import { FindServiceComponent } from './find-service.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FindServiceComponent
  ],
  imports: [
    CommonModule,
    FindServiceRoutingModule,
    SharedModule
  ]
})
export class FindServiceModule { }
