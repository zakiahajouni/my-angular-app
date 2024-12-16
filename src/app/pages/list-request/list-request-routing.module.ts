import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRequestComponent } from './list-request.component';

const routes: Routes = [
  {path:'', component: ListRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRequestRoutingModule { }
