import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProfessionalComponent } from './add-professional.component';

const routes: Routes = [
  {path : '', component: AddProfessionalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProfessionalRoutingModule { }
