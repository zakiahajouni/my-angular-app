import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProfessionalRoutingModule } from './list-professional-routing.module';
import { ListProfessionalComponent } from './list-professional.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListProfessionalComponent
  ],
  imports: [
    CommonModule,
    ListProfessionalRoutingModule,
    SharedModule
  ]
})
export class ListProfessionalModule { }
