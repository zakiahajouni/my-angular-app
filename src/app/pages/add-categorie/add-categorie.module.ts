import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategorieRoutingModule } from './add-categorie-routing.module';
import { AddCategorieComponent } from './add-categorie.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCategorieComponent
  ],
  imports: [
    CommonModule,
    AddCategorieRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AddCategorieModule { }
