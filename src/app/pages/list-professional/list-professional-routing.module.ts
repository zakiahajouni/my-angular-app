import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProfessionalComponent } from './list-professional.component';

const routes: Routes = [
  {path:'', component: ListProfessionalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProfessionalRoutingModule { }
