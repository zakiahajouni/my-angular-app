import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCategorieRoutingModule } from './list-categorie-routing.module';
import { ListCategorieComponent } from './list-categorie.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListCategorieComponent,
  ],
  imports: [
    CommonModule,
    ListCategorieRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ListCategorieModule { }
