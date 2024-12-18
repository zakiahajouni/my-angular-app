import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyCategorieRoutingModule } from './modify-categorie-routing.module';
import { ModifyCategorieComponent } from './modify-categorie.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModifyCategorieComponent
  ],
  imports: [
    CommonModule,
    ModifyCategorieRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ModifyCategorieModule { }
