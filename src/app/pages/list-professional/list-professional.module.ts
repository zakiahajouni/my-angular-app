import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProfessionalRoutingModule } from './list-professional-routing.module';
import { ListProfessionalComponent } from './list-professional.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListProfessionalComponent
  ],
  imports: [
    CommonModule,
    ListProfessionalRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ListProfessionalModule { }
