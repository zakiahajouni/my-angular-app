import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifySousCategorieComponent } from './modify-sous-categorie.component';

const routes: Routes = [
  {path: '', component: ModifySousCategorieComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifySousCategorieRoutingModule { }
