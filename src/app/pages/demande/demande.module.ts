import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeRoutingModule } from './demande-routing.module';
import { DemandeComponent } from './demande.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DemandeComponent
  ],
  imports: [
    CommonModule,
    DemandeRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class DemandeModule { }
