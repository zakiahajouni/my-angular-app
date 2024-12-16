import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProfessionalRoutingModule } from './add-professional-routing.module';
import { AddProfessionalComponent } from './add-professional.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddProfessionalComponent
  ],
  imports: [
    CommonModule,
    AddProfessionalRoutingModule,
    SharedModule
  ]
})
export class AddProfessionalModule { }
