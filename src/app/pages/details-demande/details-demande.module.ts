import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsDemandeRoutingModule } from './details-demande-routing.module';
import { DetailsDemandeComponent } from './details-demande.component';


@NgModule({
  declarations: [
    DetailsDemandeComponent,

  ],
  imports: [
    CommonModule,
    DetailsDemandeRoutingModule
  ]
})
export class DetailsDemandeModule { }
