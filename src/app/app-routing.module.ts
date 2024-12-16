import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'accueil', loadChildren: () => import('./pages/accueil/accueil.module').then(m => m.AccueilModule) },
  { path: 'listCategorie', loadChildren: () => import('./pages/list-categorie/list-categorie.module').then(m => m.ListCategorieModule) },
  { path: 'addCategorie', loadChildren: () => import('./pages/add-categorie/add-categorie.module').then(m => m.AddCategorieModule) },
  { path: 'modifyCategorie', loadChildren: () => import('./pages/modify-categorie/modify-categorie.module').then(m => m.ModifyCategorieModule) },
  { path: 'listSousCategorie', loadChildren: () => import('./pages/list-sous-categorie/list-sous-categorie.module').then(m => m.ListSousCategorieModule) },
  { path: 'addSousCategorie', loadChildren: () => import('./pages/add-sous-categorie/add-sous-categorie.module').then(m => m.AddSousCategorieModule) },
  { path: 'modifySousCategorie', loadChildren: () => import('./pages/modify-sous-categorie/modify-sous-categorie.module').then(m => m.ModifySousCategorieModule) },
  { path: 'listServiceClient', loadChildren: () => import('./pages/list-service-client/list-service-client.module').then(m => m.ListServiceClientModule) },
  { path: 'addServiceClient', loadChildren: () => import('./pages/add-service-client/add-service-client.module').then(m => m.AddServiceClientModule) },
  { path: 'modifyServiceClient', loadChildren: () => import('./pages/modify-service-client/modify-service-client.module').then(m => m.ModifyServiceClientModule) },
  { path: 'listProfessional', loadChildren: () => import('./pages/list-professional/list-professional.module').then(m => m.ListProfessionalModule) },
  { path: 'addProfessional', loadChildren: () => import('./pages/add-professional/add-professional.module').then(m => m.AddProfessionalModule) },
  { path: 'modifyProfessional', loadChildren: () => import('./pages/modify-professional/modify-professional.module').then(m => m.ModifyProfessionalModule) },
  { path: 'listRequest', loadChildren: () => import('./pages/list-request/list-request.module').then(m => m.ListRequestModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
