import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyServiceClientComponent } from './modify-service-client.component';

const routes: Routes = [
  {path:'', component: ModifyServiceClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyServiceClientRoutingModule { }
