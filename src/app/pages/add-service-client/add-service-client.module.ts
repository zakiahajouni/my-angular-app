import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServiceClientRoutingModule } from './add-service-client-routing.module';
import { AddServiceClientComponent } from './add-service-client.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddServiceClientComponent
  ],
  imports: [
    CommonModule,
    AddServiceClientRoutingModule,
    SharedModule
  ]
})
export class AddServiceClientModule { }
