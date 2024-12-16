import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSousCategorieRoutingModule } from './add-sous-categorie-routing.module';
import { AddSousCategorieComponent } from './add-sous-categorie.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddSousCategorieComponent
  ],
  imports: [
    CommonModule,
    AddSousCategorieRoutingModule,
    SharedModule
  ]
})
export class AddSousCategorieModule { }
