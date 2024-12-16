import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSousCategorieComponent } from './list-sous-categorie.component';

const routes: Routes = [
  {path: '', component: ListSousCategorieComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSousCategorieRoutingModule { }
