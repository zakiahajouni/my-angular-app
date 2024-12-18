import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyServiceClientRoutingModule } from './modify-service-client-routing.module';
import { ModifyServiceClientComponent } from './modify-service-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModifyServiceClientComponent
  ],
  imports: [
    CommonModule,
    ModifyServiceClientRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ModifyServiceClientModule { }
