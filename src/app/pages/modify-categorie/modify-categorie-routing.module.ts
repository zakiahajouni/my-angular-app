import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyCategorieComponent } from './modify-categorie.component';

const routes: Routes = [
  { path: '', component: ModifyCategorieComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyCategorieRoutingModule { }
