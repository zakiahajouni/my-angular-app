import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSousCategorieComponent } from './add-sous-categorie.component';

const routes: Routes = [
  {path: '', component: AddSousCategorieComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSousCategorieRoutingModule { }
