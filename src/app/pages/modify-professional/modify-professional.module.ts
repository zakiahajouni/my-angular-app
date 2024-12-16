import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyProfessionalRoutingModule } from './modify-professional-routing.module';
import { ModifyProfessionalComponent } from './modify-professional.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ModifyProfessionalComponent
  ],
  imports: [
    CommonModule,
    ModifyProfessionalRoutingModule,
    SharedModule
  ]
})
export class ModifyProfessionalModule { }
