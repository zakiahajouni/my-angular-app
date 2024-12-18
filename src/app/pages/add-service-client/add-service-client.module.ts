import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServiceClientRoutingModule } from './add-service-client-routing.module';
import { AddServiceClientComponent } from './add-service-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddServiceClientComponent
  ],
  imports: [
    CommonModule,
    AddServiceClientRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AddServiceClientModule { }
