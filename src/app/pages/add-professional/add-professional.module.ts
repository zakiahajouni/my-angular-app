import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProfessionalRoutingModule } from './add-professional-routing.module';
import { AddProfessionalComponent } from './add-professional.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProfessionalComponent
  ],
  imports: [
    CommonModule,
    AddProfessionalRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AddProfessionalModule { }
