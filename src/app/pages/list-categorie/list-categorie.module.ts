import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategorieRoutingModule } from './list-categorie-routing.module';
import { ListCategorieComponent } from './list-categorie.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListCategorieComponent
  ],
  imports: [
    CommonModule,
    ListCategorieRoutingModule,
    SharedModule
  ]
})
export class ListCategorieModule { }
