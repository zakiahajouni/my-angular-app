import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyProfessionalRoutingModule } from './modify-professional-routing.module';
import { ModifyProfessionalComponent } from './modify-professional.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModifyProfessionalComponent
  ],
  imports: [
    CommonModule,
    ModifyProfessionalRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ModifyProfessionalModule { }
