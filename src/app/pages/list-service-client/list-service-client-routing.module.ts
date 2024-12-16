import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServiceClientComponent } from './list-service-client.component';

const routes: Routes = [
  {path: '', component: ListServiceClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListServiceClientRoutingModule { }
