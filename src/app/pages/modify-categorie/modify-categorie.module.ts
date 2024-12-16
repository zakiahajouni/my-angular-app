import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyCategorieRoutingModule } from './modify-categorie-routing.module';
import { ModifyCategorieComponent } from './modify-categorie.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ModifyCategorieComponent
  ],
  imports: [
    CommonModule,
    ModifyCategorieRoutingModule,
    SharedModule
  ]
})
export class ModifyCategorieModule { }
