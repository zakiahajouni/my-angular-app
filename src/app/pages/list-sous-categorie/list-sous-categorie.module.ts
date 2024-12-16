import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSousCategorieRoutingModule } from './list-sous-categorie-routing.module';
import { ListSousCategorieComponent } from './list-sous-categorie.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListSousCategorieComponent
  ],
  imports: [
    CommonModule,
    ListSousCategorieRoutingModule,
    SharedModule
  ]
})
export class ListSousCategorieModule { }
