import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifySousCategorieRoutingModule } from './modify-sous-categorie-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModifySousCategorieComponent } from './modify-sous-categorie.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModifySousCategorieComponent
  ],
  imports: [
    CommonModule,
    ModifySousCategorieRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ModifySousCategorieModule { }
