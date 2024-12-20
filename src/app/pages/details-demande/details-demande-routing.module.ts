import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsDemandeComponent } from './details-demande.component';

const routes: Routes = [{ path: '', component: DetailsDemandeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsDemandeRoutingModule { }
