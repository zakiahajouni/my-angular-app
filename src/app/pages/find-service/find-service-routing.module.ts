import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindServiceComponent } from './find-service.component';

const routes: Routes = [
  {path: '', component: FindServiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindServiceRoutingModule { }
