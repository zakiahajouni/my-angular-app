import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListServiceClientRoutingModule } from './list-service-client-routing.module';
import { ListServiceClientComponent } from './list-service-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListServiceClientComponent
  ],
  imports: [
    CommonModule,
    ListServiceClientRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ListServiceClientModule { }
