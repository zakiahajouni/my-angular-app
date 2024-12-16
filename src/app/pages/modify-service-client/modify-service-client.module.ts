import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyServiceClientRoutingModule } from './modify-service-client-routing.module';
import { ModifyServiceClientComponent } from './modify-service-client.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ModifyServiceClientComponent
  ],
  imports: [
    CommonModule,
    ModifyServiceClientRoutingModule,
    SharedModule
  ]
})
export class ModifyServiceClientModule { }
