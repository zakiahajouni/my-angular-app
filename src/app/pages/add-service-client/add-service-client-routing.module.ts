import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServiceClientComponent } from './add-service-client.component';

const routes: Routes = [
  {path:'', component: AddServiceClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddServiceClientRoutingModule { }
