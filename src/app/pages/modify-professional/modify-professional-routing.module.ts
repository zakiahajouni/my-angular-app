import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyProfessionalComponent } from './modify-professional.component';

const routes: Routes = [
  {path : '', component: ModifyProfessionalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyProfessionalRoutingModule { }
