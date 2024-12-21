import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindProComponent } from './find-pro.component';

const routes: Routes = [
  {path :'', component: FindProComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindProRoutingModule { }
